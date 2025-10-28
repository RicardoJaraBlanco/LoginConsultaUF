// src/services/ufService.ts
export interface UfData {
  fecha: string;
  valor: number;
}

export async function obtenerUfDia(fecha: string): Promise<number> {
  const res = await fetch(`https://mindicador.cl/api/uf/${fecha}`);
  if (!res.ok) throw new Error("Error en la API");
  const data = await res.json();

  if (data.serie && data.serie.length > 0) {
    return data.serie[0].valor;
  } else {
    throw new Error("No hay UF disponible para la fecha seleccionada.");
  }
}

export async function obtenerUfRango(desde: Date, hasta: Date): Promise<UfData[]> {
  const anioInicio = desde.getFullYear();
  const anioFin = hasta.getFullYear();

  const promesas = [];
  for (let anio = anioInicio; anio <= anioFin; anio++) {
    promesas.push(fetch(`https://mindicador.cl/api/uf/${anio}`).then(r => r.json()));
  }

  const resultados = await Promise.all(promesas);
  let datosCombinados: any[] = [];
  resultados.forEach((data) => {
    if (data.serie) datosCombinados = [...datosCombinados, ...data.serie];
  });

  let filtrado = datosCombinados
    .filter(item => {
      const fechaItem = new Date(item.fecha);
      return fechaItem >= desde && fechaItem <= hasta;
    })
    .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())
    .map(item => ({
      fecha: new Date(item.fecha).toLocaleDateString("es-CL"),
      valor: item.valor
    }));

  if (filtrado.length === 0) {
    throw new Error("No hay datos disponibles en el rango seleccionado.");
  }

  // Reducir puntos si hay demasiados (máx 300)
  if (filtrado.length > 300) {
    const step = Math.ceil(filtrado.length / 300);
    filtrado = filtrado.filter((_, idx) => idx % step === 0);
  }

  return filtrado;
}
