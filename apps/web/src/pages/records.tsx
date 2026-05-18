import { useState } from "react";
import { Link, useLocation } from "wouter";
import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HealthIcon } from "@/components/ui/health-icon";
import { useProfile } from "@/context/ProfileContext";
import {
  useListCareRecords,
  useCreateCareRecord,
  getListCareRecordsQueryKey
} from "@workspace/api-client-react";
import { CreateCareRecordBodyType, CreateCareRecordBodyStatus } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryClient } from "@tanstack/react-query";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { AddCircleLinear as Plus, CalendarLinear as Calendar, UploadSquareLinear as FileUp } from "solar-icon-set";
import {
  NotebookBold as MedicalRecordsFilled,
  StethoscopeBold as StethoscopeFilled,
  TestTubeBold as TestTubesFilled,
  Folder2Bold as UiFolderFilled,
  NotebookLinear as MedicalRecordsOutline,
  StethoscopeLinear as StethoscopeOutline,
  TestTubeLinear as TestTubesOutline,
  Folder2Linear as UiFolderOutline,
} from "solar-icon-set";

export default function Records() {
  const { profileId, activeProfileId } = useProfile();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("all");
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const { data: records, isLoading } = useListCareRecords(
    { familyMemberId: activeProfileId },
    { query: { queryKey: ["care-records", activeProfileId], enabled: !!activeProfileId } }
  );

  const createRecord = useCreateCareRecord();
  const [title, setTitle] = useState("");
  const [hospital, setHospital] = useState("");
  const [type, setType] = useState<CreateCareRecordBodyType>(CreateCareRecordBodyType.visit);

  const filteredRecords = activeTab === "all" ? records : records?.filter(r => r.type === activeTab);

  const getIcon = (type: string) => {
    switch (type) {
      case 'lab': return <HealthIcon outline={TestTubesOutline} filled={TestTubesFilled} width="16" height="16" />;
      case 'visit': return <HealthIcon outline={StethoscopeOutline} filled={StethoscopeFilled} width="16" height="16" />;
      case 'doc': return <HealthIcon outline={UiFolderOutline} filled={UiFolderFilled} width="16" height="16" />;
      default: return <HealthIcon outline={MedicalRecordsOutline} filled={MedicalRecordsFilled} width="16" height="16" />;
    }
  };

  const getStatusColor = (status?: string | null) => {
    switch (status) {
      case 'normal': return "bg-green-500/10 text-green-700";
      case 'follow_up': return "bg-orange-500/10 text-orange-700";
      case 'reviewed': return "bg-blue-500/10 text-blue-700";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const handleAddRecord = (e: React.FormEvent) => {
    e.preventDefault();
    createRecord.mutate({
      data: { profileId, familyMemberId: activeProfileId, documentTitle: title, hospitalClinic: hospital, type, status: CreateCareRecordBodyStatus.saved, dateOfRecord: new Date().toISOString() }
    }, {
      onSuccess: () => {
        toast({ title: "Record added" });
        queryClient.invalidateQueries({ queryKey: ["care-records", activeProfileId] });
        setOpen(false);
        setTitle(""); setHospital("");
      }
    });
  };

  return (
    <MobileAppShell>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="h-page">Care Records</h1>
          <Button size="icon" variant="soft" data-testid="btn-add-record" onClick={() => setLocation("/records/new")}>
            <Plus size={16} />
          </Button>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid grid-cols-4 w-full bg-muted/50 rounded-2xl p-1.5 h-13 shadow-sm gap-1" style={{ height: 52 }}>
            <TabsTrigger value="all" className="rounded-xl text-sm font-semibold h-full data-[state=active]:bg-background data-[state=active]:shadow-md">All</TabsTrigger>
            <TabsTrigger value="visit" className="rounded-xl text-sm font-semibold h-full data-[state=active]:bg-background data-[state=active]:shadow-md">Visits</TabsTrigger>
            <TabsTrigger value="lab" className="rounded-xl text-sm font-semibold h-full data-[state=active]:bg-background data-[state=active]:shadow-md">Labs</TabsTrigger>
            <TabsTrigger value="imaging" className="rounded-xl text-sm font-semibold h-full data-[state=active]:bg-background data-[state=active]:shadow-md">Imaging</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex gap-2 mb-6 flex-wrap">
          <Button variant="soft" size="sm" className="whitespace-nowrap">
            <FileUp size={14} /> Export Summary
          </Button>
          <Button variant="soft" size="sm" className="whitespace-nowrap">
            Filter by Date
          </Button>
        </div>

        {isLoading ? (
          <div className="space-y-5">
            {[1, 2, 3].map(i => (
              <Card key={i} className="border-none shadow-sm">
                <CardContent className="p-4 flex gap-4">
                  <Skeleton className="h-10 w-10 rounded-xl" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-5 w-2/3" />
                    <Skeleton className="h-4 w-1/3" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredRecords?.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <div className="text-primary/20 flex justify-center mb-4">
              <HealthIcon outline={MedicalRecordsOutline} filled={MedicalRecordsFilled} width="48" height="48" />
            </div>
            <p className="text-sm mb-4">No records found.</p>
            <Button variant="soft" onClick={() => setLocation("/records/new")}>Add Record</Button>
          </div>
        ) : (
          <div>
            {filteredRecords?.map((record) => (
              <Link key={record.id} href={`/records/${record.id}`} className="block my-[6px]">
              <Card className="group border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer" data-testid={`record-card-${record.id}`}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        {getIcon(record.type)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground text-sm tracking-[-0.01em] line-clamp-1">
                          {record.documentTitle || record.hospitalClinic || "Care Record"}
                        </h3>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                          <Calendar size={12} />
                          {record.dateOfRecord ? new Date(record.dateOfRecord).toLocaleDateString() : 'Date unrecorded'}
                        </div>
                      </div>
                    </div>
                    {record.status && (
                      <Badge variant="outline" className={`border-none text-[10px] px-2 py-0.5 font-medium capitalize ${getStatusColor(record.status)}`}>
                        {record.status.replace('_', ' ')}
                      </Badge>
                    )}
                  </div>
                  {record.hospitalClinic && (
                    <div className="text-xs text-muted-foreground bg-muted/30 px-3 py-1.5 rounded-lg inline-block">
                      {record.hospitalClinic}
                    </div>
                  )}
                </CardContent>
              </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </MobileAppShell>
  );
}
