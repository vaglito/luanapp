import { Container, Paper } from "@mui/material";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
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
                <ForgotPasswordForm />
            </Paper>
        </Container>
    );
}
