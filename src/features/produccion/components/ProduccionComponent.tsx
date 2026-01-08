import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const ProduccionComponent: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Produccion</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Contenido del componente Produccion</p>
      </CardContent>
    </Card>
  );
};
