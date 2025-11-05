"use client";

import { Formik } from "formik";
import * as Yup from "yup";
import TextInput from "@/shared/components/FormComponents/TextInput";
import PhoneNumberInput from "@/shared/components/FormComponents/PhoneNumberInput";

type LoginFormProps = {
    formID?: string;
    afterSubmit?: () => void;
};

const LoginFormSchema = Yup.object().shape({
    name: Yup.string().required("이름을 입력해주세요."),
    phoneNumber: Yup.string()
        .matches(/^[0-9]{10,11}$/, "올바른 전화번호를 입력해주세요.")
        .required("전화번호를 입력해주세요."),
});

export default function LoginForm({ formID = "loginForm" }: LoginFormProps) {
    // const { signIn } = useSession();

    return (
        <Formik
            initialValues={{ name: "", phoneNumber: "" }}
            validationSchema={LoginFormSchema}
            // onSubmit={async (_values, actions) => {
            //     try {
            //         await
            //     } catch (err: any) {
            //         alert(err);
            //     }
            //     actions.setSubmitting(false);
            // }}
            onSubmit={async (values, actions) => {
                alert(JSON.stringify(values));
                actions.setSubmitting(false);
            }}
        >
            {({ handleSubmit, isValid, dirty }) => (
                <form
                    id={formID}
                    onSubmit={handleSubmit}
                    className="flex flex-col"
                >
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
                        className="mt-4 font-body06 w-full py-3.5 bg-zinc-800 disabled:bg-transparent disabled:text-grey-700 text-white disabled:cursor-not-allowed hover:bg-zinc-700 cursor-pointer transition-colors rounded-xl"
                        disabled={!(isValid && dirty)}
                    >
                        로그인
                    </button>
                </form>
            )}
        </Formik>
    );
}
