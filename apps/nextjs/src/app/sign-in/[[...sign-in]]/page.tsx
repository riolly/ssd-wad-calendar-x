import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <>
      <SignIn
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
