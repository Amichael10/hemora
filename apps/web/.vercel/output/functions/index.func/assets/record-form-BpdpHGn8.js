import { c as reactExports, q as jsxRuntimeExports } from "../server.js";
import { u as useLocation, q as useRoute, d as useProfile, a as useToast, F as useGetCareRecord, D as useCreateCareRecord, G as useUpdateCareRecord, H as useDeleteCareRecord, E as CreateCareRecordBodyType, I as CreateCareRecordBodyStatus, J as supabase } from "./AppRouter-yFV4k-aY.js";
import { M as MobileAppShell } from "./MobileAppShell-o-1rb7vr.js";
import { S as SubPageHeader } from "./SubPageHeader-bz5RHVOt.js";
import { B as Button } from "./button-Be3fVaAL.js";
import { I as Input } from "./input-BdT5cO17.js";
import { L as Label } from "./label-oa-7Bv2h.js";
import { T as Textarea } from "./textarea-ZWvuJzjm.js";
import { S as Skeleton } from "./skeleton-DZx3sViR.js";
import { v as aH1 } from "./index-D2ZfvGdl.js";
import "node:async_hooks";
import "node:stream";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream/web";
import "./router-BY6ex80A.js";
import "./push.server-DA3L-NAE.js";
import "buffer";
import "url";
import "https";
import "net";
import "tls";
import "assert";
import "tty";
import "os";
import "http";
import "./index-CJIBj5JK.js";
import "./Combination-BEb72fQw.js";
import "./auth-middleware-C0ZeJ0gn.js";
import "./createMiddleware-BvN2ghIY.js";
import "./index-DkPu60F3.js";
function RecordForm() {
  const [, setLocation] = useLocation();
  const [, editParams] = useRoute("/records/:id/edit");
  const id = editParams?.id;
  const isEdit = !!id;
  const { profileId, activeProfileId } = useProfile();
  const { toast } = useToast();
  const { data: rec, isLoading } = useGetCareRecord(id);
  const createRec = useCreateCareRecord();
  const updateRec = useUpdateCareRecord();
  const deleteRec = useDeleteCareRecord();
  const [title, setTitle] = reactExports.useState("");
  const [hospital, setHospital] = reactExports.useState("");
  const [type, setType] = reactExports.useState(CreateCareRecordBodyType.visit);
  const [date, setDate] = reactExports.useState((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
  const [labName, setLabName] = reactExports.useState("");
  const [notes, setNotes] = reactExports.useState("");
  const [file, setFile] = reactExports.useState(null);
  const [fileUrl, setFileUrl] = reactExports.useState(null);
  const [uploading, setUploading] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (rec) {
      setTitle(rec.documentTitle ?? "");
      setHospital(rec.hospitalClinic ?? "");
      setType(rec.type ?? CreateCareRecordBodyType.visit);
      if (rec.dateOfRecord) setDate(new Date(rec.dateOfRecord).toISOString().slice(0, 10));
      setLabName(rec.labName ?? "");
      setNotes(rec.notes ?? "");
      setFileUrl(rec.fileUrl ?? null);
    }
  }, [rec]);
  const uploadFile = async () => {
    if (!file) return fileUrl;
    setUploading(true);
    try {
      const { data: auth } = await supabase.auth.getUser();
      const uid = auth.user?.id;
      if (!uid) throw new Error("Not signed in");
      const path = `${uid}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
      const { error } = await supabase.storage.from("care-record-files").upload(path, file);
      if (error) throw error;
      return path;
    } finally {
      setUploading(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!activeProfileId) return;
    let savedFileUrl = fileUrl;
    try {
      savedFileUrl = await uploadFile();
    } catch (err) {
      toast({ title: "Upload failed", description: err.message, variant: "destructive" });
      return;
    }
    const data = {
      profileId,
      familyMemberId: activeProfileId,
      documentTitle: title,
      hospitalClinic: hospital,
      type,
      status: CreateCareRecordBodyStatus.saved,
      dateOfRecord: new Date(date).toISOString(),
      labName: type === "lab" ? labName || null : null,
      fileUrl: savedFileUrl,
      notes: type === "other" ? notes || null : null
    };
    if (isEdit) {
      updateRec.mutate({ id, data }, {
        onSuccess: () => {
          toast({ title: "Record updated" });
          setLocation("/records");
        },
        onError: (e2) => toast({ title: "Couldn't save", description: e2?.message, variant: "destructive" })
      });
    } else {
      createRec.mutate({ data }, {
        onSuccess: () => {
          toast({ title: "Record added" });
          setLocation("/records");
        },
        onError: (e2) => toast({ title: "Couldn't save", description: e2?.message, variant: "destructive" })
      });
    }
  };
  const handleDelete = () => {
    if (!id) return;
    if (!confirm("Delete this record?")) return;
    deleteRec.mutate({ id }, { onSuccess: () => {
      toast({ title: "Deleted" });
      setLocation("/records");
    } });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(MobileAppShell, { hideNav: true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SubPageHeader, { title: isEdit ? "Edit record" : "Add record", back: "/records" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 pb-10", children: isEdit && isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: "Type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-2", children: ["visit", "lab", "imaging", "other"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: type === t ? "default" : "outline",
            onClick: () => setType(t),
            className: `h-11 capitalize text-xs rounded-xl ${type === t ? "" : "bg-card border-border/60"}`,
            children: t
          },
          t
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: "Title" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: title,
            onChange: (e) => setTitle(e.target.value),
            required: true,
            placeholder: "e.g. Blood Work",
            className: "h-12 text-base rounded-xl bg-card border-border/60"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: "Hospital / Clinic" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: hospital,
            onChange: (e) => setHospital(e.target.value),
            placeholder: "e.g. General Hospital",
            className: "h-12 text-base rounded-xl bg-card border-border/60"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: "Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "date",
            value: date,
            onChange: (e) => setDate(e.target.value),
            className: "h-12 text-base rounded-xl bg-card border-border/60"
          }
        )
      ] }),
      type === "lab" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-sm font-medium", children: [
          "Lab name ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal", children: "(optional)" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: labName,
            onChange: (e) => setLabName(e.target.value),
            placeholder: "e.g. Synlab, Clinix",
            className: "h-12 text-base rounded-xl bg-card border-border/60"
          }
        )
      ] }),
      type === "imaging" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: "Upload image / scan" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "rec-file", className: "flex flex-col items-center justify-center gap-2 p-6 rounded-xl border-2 border-dashed border-border/60 bg-card cursor-pointer hover:border-primary/40 transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(aH1, { size: 22 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: file ? file.name : fileUrl ? "File attached — choose to replace" : "Tap to choose a file" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "rec-file",
              type: "file",
              accept: "image/*,application/pdf",
              className: "hidden",
              onChange: (e) => setFile(e.target.files?.[0] ?? null)
            }
          )
        ] })
      ] }),
      type === "other" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: "Notes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            value: notes,
            onChange: (e) => setNotes(e.target.value),
            placeholder: "Add any details about this record",
            className: "min-h-[120px] rounded-xl bg-card border-border/60 text-base"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", size: "xl", className: "w-full mt-6", disabled: createRec.isPending || updateRec.isPending || uploading, children: isEdit ? "Save changes" : "Add record" }),
      isEdit && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "crisis", size: "xl", className: "w-full", onClick: handleDelete, disabled: deleteRec.isPending, children: "Delete record" })
    ] }) })
  ] });
}
export {
  RecordForm as default
};
