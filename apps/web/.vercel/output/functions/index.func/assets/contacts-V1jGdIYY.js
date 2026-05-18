import { c as reactExports, q as jsxRuntimeExports } from "../server.js";
import { M as MobileAppShell } from "./MobileAppShell-o-1rb7vr.js";
import { S as SubPageHeader } from "./SubPageHeader-bz5RHVOt.js";
import { B as Button } from "./button-Be3fVaAL.js";
import { I as Input } from "./input-BdT5cO17.js";
import { L as Label } from "./label-oa-7Bv2h.js";
import { S as Skeleton } from "./skeleton-DZx3sViR.js";
import { d as useProfile, a as useToast, S as useListEmergencyContacts, T as getListEmergencyContactsQueryKey, al as useCreateEmergencyContact, am as useDeleteEmergencyContact } from "./AppRouter-yFV4k-aY.js";
import { S as Sheet, a as SheetTrigger, b as SheetContent, c as SheetHeader, d as SheetTitle } from "./sheet-DxsnJkfN.js";
import { i as p11, a4 as L41, s as s01 } from "./index-D2ZfvGdl.js";
import "node:async_hooks";
import "node:stream";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream/web";
import "./index-CJIBj5JK.js";
import "./Combination-BEb72fQw.js";
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
import "./auth-middleware-C0ZeJ0gn.js";
import "./createMiddleware-BvN2ghIY.js";
import "./index-DkPu60F3.js";
import "./router-BY6ex80A.js";
function Contacts() {
  const { profileId } = useProfile();
  const { toast } = useToast();
  const [open, setOpen] = reactExports.useState(false);
  const [name, setName] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  const [relationship, setRelationship] = reactExports.useState("");
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(MobileAppShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SubPageHeader,
      {
        title: "Emergency contacts",
        back: "/settings",
        right: /* @__PURE__ */ jsxRuntimeExports.jsxs(Sheet, { open, onOpenChange: setOpen, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { "aria-label": "Add contact", className: "w-9 h-9 rounded-full flex items-center justify-center bg-primary text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(p11, { size: 16 }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetContent, { side: "bottom", className: "rounded-t-3xl sm:max-w-[430px] mx-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SheetHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { children: "Add contact" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleAdd, className: "space-y-3 mt-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Full name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: name, onChange: (e) => setName(e.target.value), required: true })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Phone" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "tel", value: phone, onChange: (e) => setPhone(e.target.value), required: true })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Relationship" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: relationship, onChange: (e) => setRelationship(e.target.value), placeholder: "e.g. Mother" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", size: "xl", className: "w-full", disabled: create.isPending, children: "Add contact" })
            ] })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 pb-10", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full rounded-2xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full rounded-2xl" })
    ] }) : !contacts?.length ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16 text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mb-4", children: "No emergency contacts yet." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "soft", onClick: () => setOpen(true), children: "Add your first contact" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: contacts.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl border border-border/60 p-4 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(L41, { size: 18 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold truncate", children: c.fullName }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground truncate", children: [
          c.phone,
          c.relationship ? ` · ${c.relationship}` : ""
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          "aria-label": "Delete",
          className: "text-muted-foreground hover:text-destructive p-2",
          onClick: () => {
            if (confirm("Remove contact?")) del.mutate({ id: c.id });
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(s01, { size: 16 })
        }
      )
    ] }, c.id)) }) })
  ] });
}
export {
  Contacts as default
};
