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

export default function Header() {
  return (
    <div className="bg-slate-300 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>LOGO</div>
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
            <SignOut />
          </Authenticated>
        </div>
      </div>
    </div>
  );
}
