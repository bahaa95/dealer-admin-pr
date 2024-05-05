"use client";
import { FC } from "react";
import {
  AlertDialog as AD,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

type AlertDialogProps = {
  children: React.ReactNode;
  title: string;
  description: string;
  okTitle?: string;
  notOkTitle?: string;
  action: (() => void) | (() => Promise<void>);
};

export const AlertDialog: FC<AlertDialogProps> = ({
  children,
  title,
  description,
  okTitle = "نعم",
  notOkTitle = "الغاء",
  action,
}) => {
  return (
    <AD>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{notOkTitle}</AlertDialogCancel>
          <AlertDialogAction onClick={action}>{okTitle}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AD>
  );
};
