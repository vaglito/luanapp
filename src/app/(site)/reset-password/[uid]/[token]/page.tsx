
import { Container, Paper } from "@mui/material";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";


interface PageProps {
    params: Promise<{
        uid: string;
        token: string;
    }>;
}

export default async function ResetPasswordPage(props: PageProps) {
    const params = await props.params;

    return (
        <Container
            maxWidth="sm"
            sx={{
                minHeight: "80vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    width: "100%",
                    p: 4,
                    borderRadius: 3,
                }}
            >
                <ResetPasswordForm uid={params.uid} token={params.token} />
            </Paper>
        </Container>
    );
}
