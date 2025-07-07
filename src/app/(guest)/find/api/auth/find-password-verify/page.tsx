'use client'
import ResetPasswordForm from "@/features/auth/ui/ResetPasswordForm";
import { Suspense } from "react";
const FindPasswordVerifyPage = () => {
    return (
        <Suspense fallback={<></>}>
            <ResetPasswordForm />
        </Suspense>
    )
};

export default FindPasswordVerifyPage;