import { SignUp } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <>
      <SignUp
        appearance={{
          layout: {
            logoImageUrl:
              "https://raw.githubusercontent.com/riolly/web-dev-universe/master/public/riolly-dark.svg",
            socialButtonsPlacement: "top",
          },
        }}
      />
    </>
  );
}
