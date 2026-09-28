import React, { useState } from "react";
import { MessageSquareText } from "lucide-react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Button from "@/components/ui/Button";

export default function MessagesDropdown() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      {/* أيقونة فتح القائمة */}
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label="Messages"
          className="flex items-center justify-center p-1.5 text-foreground hover:text-primary transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
        >
          <MessageSquareText className="h-[22px] w-[22px]" strokeWidth={1.5} />
        </button>
      </PopoverTrigger>

      {/* النافذة المنبثقة */}
      <PopoverContent
        align="center"
        sideOffset={10}
        className="w-72 rounded-2xl border border-border bg-popover p-5 text-popover-foreground shadow-2xl z-50 animate-in fade-in-0 zoom-in-95"
      >
        <div className="flex flex-col text-center">
          <h4 className="font-bold text-sm text-foreground mb-1">
            {t("navbar.messages") || "Messages"}
          </h4>
          <p className="text-xs text-muted-foreground mb-4">
            {isAuthenticated
              ? t("navbar.viewConversations") ||
                "View and manage your conversations"
              : t("navbar.signInToViewMore") || "Sign in to view your messages"}
          </p>

          {/* التوجيه بناءً على حالة تسجيل الدخول */}
          {isAuthenticated ? (
            <Button
              to="/messages"
              variant="primary"
              onClick={() => setIsOpen(false)}
              className="w-full h-10 rounded-full text-sm font-semibold shadow-sm"
            >
              {t("navbar.openMessages") || "Open Messages"}
            </Button>
          ) : (
            <Button
              to="/auth"
              variant="primary"
              onClick={() => setIsOpen(false)}
              className="w-full h-10 rounded-full text-sm font-semibold shadow-sm"
            >
              {t("navbar.signIn") || "Sign in"}
            </Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
