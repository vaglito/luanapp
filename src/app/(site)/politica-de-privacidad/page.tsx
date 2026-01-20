import { Container, Box, Typography, Paper } from "@mui/material";

export const metadata = {
    title: "Política de Privacidad | Corporación Luana",
    description: "Conoce cómo recopilamos, usamos y protegemos tus datos personales en Corporación Luana.",
};

export default function PrivacyPolicyPage() {
    return (
        <Container maxWidth="lg" sx={{ my: 8 }}>
            {/* Header */}
            <Box sx={{ mb: 6, textAlign: "center" }}>
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: "bold",
                        color: "#545454",
                        textTransform: "uppercase",
                        mb: 1,
                        fontSize: { xs: "2rem", md: "3rem" },
                    }}
                >
                    Política de Privacidad
                </Typography>
                <Box
                    sx={{
                        width: "80px",
                        height: "4px",
                        bgcolor: "#A3147F",
                        mx: "auto",
                        borderRadius: "2px",
                    }}
                />
            </Box>

            {/* Content */}
            <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: 4, bgcolor: "white", border: "1px solid #e5e7eb" }}>

                <Box sx={{ mb: 4 }}>
                    <Typography variant="h5" sx={{ fontWeight: 600, color: "#545454", mb: 2 }}>
                        1. Introducción
                    </Typography>
                    <Typography paragraph sx={{ color: "#6b7280" }}>
                        En <strong>Corporación Luana S.A.C.</strong>, valoramos tu privacidad y estamos comprometidos a proteger tus datos personales.
                        Esta Política de Privacidad explica cómo recopilamos, utilizamos y salvaguardamos tu información cuando visitas nuestro sitio web y utilizas nuestros servicios.
                    </Typography>
                </Box>

                <Box sx={{ mb: 4 }}>
                    <Typography variant="h5" sx={{ fontWeight: 600, color: "#545454", mb: 2 }}>
                        2. Información que Recopilamos
                    </Typography>
                    <Typography paragraph sx={{ color: "#6b7280" }}>
                        Podemos recopilar la siguiente información personal:
                    </Typography>
                    <ul style={{ color: "#6b7280", paddingLeft: "1.5rem" }}>
                        <li>Información de contacto: Nombre, dirección de correo electrónico, número de teléfono.</li>
                        <li>Información de facturación y envío: Dirección de entrega, información de pago.</li>
                        <li>Información de la cuenta: Historial de pedidos, preferencias de usuario.</li>
                        <li>Información técnica: Dirección IP, tipo de navegador, sistema operativo y datos de navegación.</li>
                    </ul>
                </Box>

                <Box sx={{ mb: 4 }}>
                    <Typography variant="h5" sx={{ fontWeight: 600, color: "#545454", mb: 2 }}>
                        3. Uso de la Información
                    </Typography>
                    <Typography paragraph sx={{ color: "#6b7280" }}>
                        Utilizamos la información recopilada para los siguientes fines:
                    </Typography>
                    <ul style={{ color: "#6b7280", paddingLeft: "1.5rem" }}>
                        <li>Procesar y gestionar tus pedidos de compra.</li>
                        <li>Brindar servicio de atención al cliente y soporte técnico.</li>
                        <li>Enviar actualizaciones sobre el estado de tus pedidos.</li>
                        <li>Mejorar nuestro sitio web y la experiencia del usuario.</li>
                        <li>Cumplir con obligaciones legales y regulatorias.</li>
                    </ul>
                </Box>

                <Box sx={{ mb: 4 }}>
                    <Typography variant="h5" sx={{ fontWeight: 600, color: "#545454", mb: 2 }}>
                        4. Protección de Datos
                    </Typography>
                    <Typography paragraph sx={{ color: "#6b7280" }}>
                        Implementamos medidas de seguridad técnicas y organizativas para proteger tus datos personales contra el acceso no autorizado,
                        la pérdida, el uso indebido o la alteración. Utilizamos cifrado SSL para asegurar la transmisión de datos sensibles.
                    </Typography>
                </Box>

                <Box sx={{ mb: 4 }}>
                    <Typography variant="h5" sx={{ fontWeight: 600, color: "#545454", mb: 2 }}>
                        5. Compartir Información
                    </Typography>
                    <Typography paragraph sx={{ color: "#6b7280" }}>
                        No vendemos ni alquilamos tu información personal a terceros. Solo compartimos tus datos con proveedores de servicios de confianza
                        que nos ayudan a operar nuestro negocio (por ejemplo, servicios de mensajería y pasarelas de pago), y siempre bajo estrictas condiciones de confidencialidad.
                    </Typography>
                </Box>

                <Box sx={{ mb: 4 }}>
                    <Typography variant="h5" sx={{ fontWeight: 600, color: "#545454", mb: 2 }}>
                        6. Tus Derechos
                    </Typography>
                    <Typography paragraph sx={{ color: "#6b7280" }}>
                        Tienes derecho a acceder, corregir o eliminar tu información personal. Si deseas ejercer estos derechos, por favor contáctanos a través de nuestros canales de atención.
                    </Typography>
                </Box>

                <Box>
                    <Typography variant="h5" sx={{ fontWeight: 600, color: "#545454", mb: 2 }}>
                        7. Cambios en la Política
                    </Typography>
                    <Typography paragraph sx={{ color: "#6b7280" }}>
                        Nos reservamos el derecho de actualizar esta Política de Privacidad en cualquier momento. Los cambios serán publicados en esta página con la fecha de la última actualización.
                    </Typography>
                </Box>

            </Paper>
        </Container>
    );
}
