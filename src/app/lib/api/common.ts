const apiUrl = process.env.API_URL;

export interface Banner {
  id: number;
  is_active: boolean;
  position_banner: number;
  title_banner: string;
  img_banner: string;
  url_banner?: string;
}

/**
 * Fetch the list of banners from the API.
 *
 * @returns {Promise<Banner[]>} A promise that resolves to the list of banners.
 *
 * @throws {Error} Throws an error if the response status is 404 (Not Found),
 * 500 (Internal Server Error),
 * or any other unexpected status
 *
 * @example
 * getBannerList().then(banners => {
 *  console.log(banners);
 * }).catch(error => {
 *  console.error(error);
 * });
 */
export const getBannerList = async (): Promise<Banner[]> => {
  try {
    const response = await fetch(`${apiUrl}/api/config/banner/`, {
      method: "GET",
      next: {
        revalidate: 300,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      switch (response.status) {
        case 404:
          throw new Error(
            "The requested resource could not be found. Not Found 404"
          );
        case 500:
          throw new Error("Internal Server Error 500.");
        default:
          throw new Error(`Unexpected error: ${response.status}`);
      }
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching banner");
  }
};
