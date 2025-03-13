export function darkenColor(hex: string, percent: number): string {
    // Eliminar el # si está presente
    hex = hex.replace(/^#/, "");

    // Convertir a valores RGB
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    // Reducir los valores en el porcentaje indicado
    r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent / 100))));
    g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent / 100))));
    b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent / 100))));

    // Convertir de vuelta a formato hexadecimal
    const darkenedHex = `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;

    return darkenedHex;
}