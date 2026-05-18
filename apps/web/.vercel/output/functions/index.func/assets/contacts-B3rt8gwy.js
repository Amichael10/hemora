import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { M as MobileAppShell } from "./MobileAppShell-BM8wQJAz.js";
import { S as SubPageHeader } from "./SubPageHeader-pHjD0lGr.js";
import { B as Button } from "./button-CVyzTRqg.js";
import { I as Input } from "./input-BYwlJ-Hq.js";
import { L as Label } from "./label-CBNEkC10.js";
import { S as Skeleton } from "./skeleton-Cb_T373O.js";
import { b as useProfile, u as useToast, O as useListEmergencyContacts, P as getListEmergencyContactsQueryKey, S as useCreateEmergencyContact, T as useDeleteEmergencyContact } from "./AppRouter-B_BCS-Zy.js";
import { S as Sheet, a as SheetTrigger, b as SheetContent, c as SheetHeader, d as SheetTitle } from "./sheet-lHYgKUEM.js";
import { AddCircleLinear, PhoneLinear, TrashBinTrashLinear } from "solar-icon-set";
import "wouter";
import "@tanstack/router-core";
import "../server.js";
import "node:async_hooks";
import "h3-v2";
import "tiny-invariant";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "@tanstack/router-core/isServer";
import "@tanstack/react-store";
import "tiny-warning";
import "node:stream";
import "react-dom/server";
import "isbot";
import "@radix-ui/react-dialog";
import "./push.server-BMx5QtSF.js";
import "web-push";
import "@supabase/supabase-js";
import "zod";
import "./auth-middleware-CfCTPg1S.js";
import "./createMiddleware-BvN2ghIY.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@radix-ui/react-label";
import "@radix-ui/react-toast";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-tooltip";
import "@tanstack/react-query";
function Contacts() {
  const { profileId } = useProfile();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [relationship, setRelationship] = useState("");
  const { data: contacts, isLoading } = useListEmergencyContacts(
    { profileId },
    { query: { queryKey: getListEmergencyContactsQueryKey({ profileId }), enabled: !!profileId } }
  );
  const create = useCreateEmergencyContact();
  const del = useDeleteEmergencyContact();
  const handleAdd = (e) => {
    e.preventDefault();
    create.mutate({ data: { fullName: name, phone, relationship } }, {
      onSuccess: () => {
        toast({ title: "Contact added" });
        setOpen(false);
        setName("");
        setPhone("");
        setRelationship("");
      }
    });
  };
  return /* @__PURE__ */ jsxs(MobileAppShell, { children: [
    /* @__PURE__ */ jsx(
      SubPageHeader,
      {
        title: "Emergency contacts",
        back: "/settings",
        right: /* @__PURE__ */ jsxs(Sheet, { open, onOpenChange: setOpen, children: [
          /* @__PURE__ */ jsx(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsx("button", { "aria-label": "Add contact", className: "w-9 h-9 rounded-full flex items-center justify-center bg-primary text-primary-foreground", children: /* @__PURE__ */ jsx(AddCircleLinear, { size: 16 }) }) }),
          /* @__PURE__ */ jsxs(SheetContent, { side: "bottom", className: "rounded-t-3xl sm:max-w-[430px] mx-auto", children: [
            /* @__PURE__ */ jsx(SheetHeader, { children: /* @__PURE__ */ jsx(SheetTitle, { children: "Add contact" }) }),
            /* @__PURE__ */ jsxs("form", { onSubmit: handleAdd, className: "space-y-3 mt-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsx(Label, { children: "Full name" }),
                /* @__PURE__ */ jsx(Input, { value: name, onChange: (e) => setName(e.target.value), required: true })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsx(Label, { children: "Phone" }),
                /* @__PURE__ */ jsx(Input, { type: "tel", value: phone, onChange: (e) => setPhone(e.target.value), required: true })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsx(Label, { children: "Relationship" }),
                /* @__PURE__ */ jsx(Input, { value: relationship, onChange: (e) => setRelationship(e.target.value), placeholder: "e.g. Mother" })
              ] }),
              /* @__PURE__ */ jsx(Button, { type: "submit", size: "xl", className: "w-full", disabled: create.isPending, children: "Add contact" })
            ] })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "px-5 pb-10", children: isLoading ? /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsx(Skeleton, { className: "h-16 w-full rounded-2xl" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "h-16 w-full rounded-2xl" })
    ] }) : !contacts?.length ? /* @__PURE__ */ jsxs("div", { className: "text-center py-16 text-muted-foreground", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm mb-4", children: "No emergency contacts yet." }),
      /* @__PURE__ */ jsx(Button, { variant: "soft", onClick: () => setOpen(true), children: "Add your first contact" })
    ] }) : /* @__PURE__ */ jsx("div", { className: "space-y-3", children: contacts.map((c) => /* @__PURE__ */ jsxs("div", { className: "bg-card rounded-2xl border border-border/60 p-4 flex items-center gap-3", children: [
      /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center", children: /* @__PURE__ */ jsx(PhoneLinear, { size: 18 }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold truncate", children: c.fullName }),
        /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground truncate", children: [
          c.phone,
          c.relationship ? ` · ${c.relationship}` : ""
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          "aria-label": "Delete",
          className: "text-muted-foreground hover:text-destructive p-2",
          onClick: () => {
            if (confirm("Remove contact?")) del.mutate({ id: c.id });
          },
          children: /* @__PURE__ */ jsx(TrashBinTrashLinear, { size: 16 })
        }
      )
    ] }, c.id)) }) })
  ] });
}
export {
  Contacts as default
};
