"use client";

import { Button } from "@/components/ui/button";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import { SignOut } from "./(auth)/SignOut";
import { SignInFormPassword } from "./(auth)/SignInForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SignInWithPassword } from "./(auth)/SignIn";
import { ModeToggle } from "@/components/ui/mode-toggle";
import Link from "next/link";

export default function Header() {
  return (
    <div className="z-10 relative dark:bg-slate-900 bg-slate-50 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex gap-12 items-center">
          <Link href="/">
            <div>LOGO</div>
          </Link>
          <nav>
            <Link href="/dashboard/documents" className="hover:text-slate-400">
              Documents
            </Link>
          </nav>
        </div>

        <div>
          <AuthLoading>Carregando...</AuthLoading>
          <Unauthenticated>
            <Dialog>
              <DialogTrigger>Open</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Sign in or create an account</DialogTitle>
                  <DialogDescription>
                    <SignInWithPassword />
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </Unauthenticated>
          <Authenticated>
            <div className="flex items-center gap-2">
              <ModeToggle />
              <SignOut />
            </div>
          </Authenticated>
        </div>
      </div>
    </div>
  );
}
