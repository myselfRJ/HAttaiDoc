import React,{useState,useEffect} from "react";
import PDFViewer from "../components/PdfViewer";
import { useRoute } from "@react-navigation/native";

const PdfView = () => {
    const route = useRoute()
    const {path} = route.params
    return(
        <PDFViewer path={path}/>
    )
}

export default PdfView