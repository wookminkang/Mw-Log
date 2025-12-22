"use client";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { useAuthStore } from "@/stores";

const loginSchema = z.object({
  email: z.email({ error: "올바른 형식의 이메일 주소를 입력해주세요." }),
  password: z.string().min(8, {
    error: "비밀번호는 최소 8자 이상이어야 합니다.",
  }),
});

type LoginSchema = z.infer<typeof loginSchema>;

function LoginForm() {
  const supabase = createClient();
  const router = useRouter();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const setUser = useAuthStore((state) => state.setUser);

  const onSubmit = async (data: LoginSchema) => {
    console.log("로그인 버튼 클릭!");
    try {
      const {
        data: { user, session },
        error,
      } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      if (user && session) {
        setUser({
          id: user.id,
          email: user.email as string,
          role: user.role as string,
        });
        toast.success("로그인을 성공하였습니다.");
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      throw new Error(`${error}`);
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google Login");
  };

  return (
    <>
      <div className="w-100 max-w-100 flex flex-col px-6 gap-6">
        <div className="flex flex-col">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            회원가입
          </h4>
          <p className="text-muted-foreground">
            로그인을 위한 정보를 입력해주세요.
          </p>
        </div>
        <div className="grid gap-3">
          {/* 소셜 로그인 */}
          <Button
            type="button"
            className="cursor-pointer"
            variant={"secondary"}
            onClick={handleGoogleLogin}
          >
            구글 로그인
          </Button>
          {/* 경계선 */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t"></span>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 text-muted-foreground bg-black uppercase">
                OR CONTINUE WITH
              </span>
            </div>
          </div>
          {/* 로그인 폼 */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이메일</FormLabel>
                    <FormControl>
                      <Input placeholder="이메일을 입력하세요." {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>비밀번호</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="비밀번호를 입력하세요."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <div className="w-full flex flex-col gap-3">
                <Button
                  type="submit"
                  variant={"outline"}
                  className="!bg-primary hover:!bg-primary/80 flex-1 cursor-pointer "
                >
                  로그인
                </Button>
                <div className="text-center">
                  계정이 없으신가요?
                  <div
                    onClick={() => router.push("/sign-up")}
                    className="underline ml-1"
                  >
                    회원가입
                  </div>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}

export { LoginForm };
