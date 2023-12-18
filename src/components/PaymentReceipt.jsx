import { Image } from "@react-pdf/renderer"
import { View } from "@react-pdf/renderer"
import { Document, Page, Text } from "@react-pdf/renderer"
import qrcode from "../assets/qrcode.png"
import logo from "../assets/logo.png"

export default function PaymentReceipt({ outletAddress, category, dropDate, pickUpDate, total, paymentMethod }){
    return (
        <Document>
            <Page style={{ padding: 32, fontSize: 16 }} size={"A5"}>
                <View style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, paddingBottom: 4, borderBottom: "5px solid #000" }}>
                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <Image src={logo} style={{ width: 48 }} />
                        <Text style={{ textAlign: "center", fontSize: 32 }}>Zenfresh</Text>
                    </View>
                    <View>
                        <Text>Address: {outletAddress}</Text>
                    </View>
                </View>
                <View style={{ display: "flex", flexDirection: "column", paddingTop: 8, marginTop: 2, borderTop: "1px solid #000" }}>
                    <Text>Customer&apos;s name: John</Text>
                    <Text>Customer&apos;s address: 147 Slug Street</Text>
                    <Text style={{ marginTop: 16 }}>Laundry category: {category}</Text>
                    <Text>Drop date: {dropDate}</Text>
                    <Text>Pick up date: {pickUpDate}</Text>
                </View>
                <View style={{ display: "flex", flexDirection: "column", marginTop: 16 }}>
                    <Text>Total: ${total}/kg</Text>
                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <Text>Payment method: </Text>
                        <Image src={paymentMethod} style={{ height: 16 }} />
                    </View>
                    <View>
                        <Image src={qrcode} style={{ width: "100px", alignSelf: "center", marginTop: 24, marginBottom: 24 }} />
                        <Text style={{ fontSize: 10, textAlign: "center", marginBottom: 4 }}>Please scan the barcode provided for payment.</Text>
                    </View>
                </View>
                <View style={{ display: "flex", flexDirection: "column", paddingTop: 8, borderTop: "1px solid #000" }}>
                    <Text>Phone: 0812 3456 7890</Text>
                    <Text>Email: zenfresh@mail.com</Text>
                    <Text>Mon - Sun: 08:00 - 17:00</Text>
                </View>
            </Page>
        </Document>
    )
}

// const styles = StyleSheet.create({
//     text: {
//         color: "red"
//     }
// })