import { Document, Page, Text } from "@react-pdf/renderer"

export default function PaymentReceipt(){
    return (
        <Document>
            <Page>
                <Text>
                    Payment Receipt
                </Text>
            </Page>
        </Document>
    )
}