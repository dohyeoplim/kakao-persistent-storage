"use client";

import { Formik } from "formik";
import * as Yup from "yup";
import TextInput from "@/shared/components/FormComponents/TextInput";
import PhoneNumberInput from "@/shared/components/FormComponents/PhoneNumberInput";
import { login } from "@/lib/session";

const LoginFormSchema = Yup.object().shape({
    name: Yup.string().required("이름을 입력해주세요."),
    phoneNumber: Yup.string()
        .matches(/^[0-9]{10,11}$/, "올바른 전화번호를 입력해주세요.")
        .required("전화번호를 입력해주세요."),
});

export default function LoginForm() {
    return (
        <Formik
            initialValues={{ name: "", phoneNumber: "" }}
            validationSchema={LoginFormSchema}
            onSubmit={async (values, actions) => {
                try {
                    await login(values.name, values.phoneNumber);
                } catch (err: any) {
                    alert(err);
                }
                actions.setSubmitting(false);
            }}
        >
            {({ handleSubmit, isValid, dirty }) => (
                <form onSubmit={handleSubmit} className="w-full flex flex-col">
                    <TextInput
                        id="name"
                        name="name"
                        placeholder="이름"
                        type="text"
                    />

                    <PhoneNumberInput
                        id="phoneNumber"
                        name="phoneNumber"
                        placeholder="전화번호"
                        type="tel"
                    />

                    <button
                        type="submit"
                        disabled={!(isValid && dirty)}
                        className="mt-4 font-body06 w-full py-3.5 bg-zinc-800 disabled:bg-zinc-200/50 text-white disabled:text-zinc-400 disabled:cursor-not-allowed cursor-pointer transition-colors rounded-[20px]"
                    >
                        로그인
                    </button>
                </form>
            )}
        </Formik>
    );
}
