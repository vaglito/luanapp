"use client";

import { Box, Pagination, PaginationItem } from "@mui/material";
import Link from "next/link";

interface InvoicesPaginationProps {
    totalPages: number;
    currentPage: number;
}

export default function InvoicesPagination({ totalPages, currentPage }: InvoicesPaginationProps) {
    if (totalPages <= 1) return null;

    return (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 6, mb: 2 }}>
            <Pagination
                count={totalPages}
                page={currentPage}
                color="primary"
                size="large"
                renderItem={(item) => (
                    <PaginationItem
                        component={Link}
                        href={`/dashboard/invoices?${item.page === 1 ? "" : `page=${item.page}`}`}
                        {...item}
                    />
                )}
            />
        </Box>
    );
}
