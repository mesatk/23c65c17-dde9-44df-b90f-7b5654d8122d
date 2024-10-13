import { CSSProperties } from "react";

export const containerStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column", // İçeriği dikey olarak alt alta sıralar
  alignItems: "center", // İçeriği yatayda ortalar
  justifyContent: "center", // İçeriği dikeyde ortalar (isteğe bağlı)
  padding: 20,
  minHeight: "100vh", // Sayfanın tamamını kapsar
};

export const buttonStyle: CSSProperties = {
  marginBottom: 16,
};

export const titleStyle: CSSProperties = {
  textAlign: "center", // Başlığı ortalar
  marginBottom: 20,
};
