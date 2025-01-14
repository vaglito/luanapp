/**
 * Interfaz que define la estructura del objeto `Banner`.
 * @interface Banner
 * @property {number} id - Identificador único del banner.
 * @property {boolean} is_active - Indica si el banner está activo.
 * @property {number} position_banner - Posición del banner en el orden de visualización.
 * @property {string} title_banner - Título del banner.
 * @property {string} img_banner - URL de la imagen del banner.
 * @property {string} [url_banner] - (Opcional) URL hacia la que redirige el banner si se hace clic en él.
 */
export interface Banner {
  id: number;
  is_active: boolean;
  position_banner: number;
  title_banner: string;
  img_banner: string;
  url_banner?: string;
}

export interface About {
  title: string;
  menu: boolean;
  slug: string;
  created_at: string;
  updated_at: string;
  content: string;
}

const api_url = process.env.API_URL;

/**
 * Obtiene los los banner principales desde la API
 * @async
 * @function getBannerList
 * @returns {Promise<Banner[]>} - Una promesa que se resuelve en una lista banners activos ({@link Banner[]}) si la solicitud es exitosa, o en un arreglo vacio ocurre un error.
 * @throws {Error} - Lanza un error si la repuesta de la API no es exitosa (codigo de estado distinto a 200).
 * @description Esta funcion realiza una solicitud HTTP GET al endpoint especificado para obtener una lista de banner activos.
 * La respuesta se valida para asegurar que sea exitosa (status 200). Si no lo es, lanza un error.
 * Si ocurre un error durante la comunicacion con la API, se captura y se devuelve un erreglo vacio.
 * */

export async function getBannerList(): Promise<Banner[]> {
  try {
    // await new Promise(resolve => setTimeout(resolve, 5000));
    const response = await fetch(`${api_url}/api/config/banner/`, {
      method: "GET",
      next: {
        revalidate: 300,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data: Banner[] = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Error en el feching de datos");
  }
}


export async function getAbout(): Promise<About> {
  try {
    const response = await fetch(
      `${api_url}/api/landing/page/detail/sobre-nosotros/`
    );
    const data: About = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Error en el feching de datos");
  }
}