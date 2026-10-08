import type {
  ProductsResponse,
  SiteSettingsResponse,
  Product,
  CategoriesResponse,
  CategoryResponse,
  AboutPageResponse,
  ContactPageResponse,
} from "./types";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

if (!STRAPI_URL) {
  throw new Error("NEXT_PUBLIC_STRAPI_URL is not defined.");
}

/* --------------------------------
   Empty Responses
-------------------------------- */

const EMPTY_PRODUCTS_RESPONSE: ProductsResponse = {
  data: [],
  meta: {
    pagination: {
      page: 1,
      pageSize: 0,
      pageCount: 0,
      total: 0,
    },
  },
};

const EMPTY_CATEGORIES_RESPONSE: CategoriesResponse = {
  data: [],
  meta: {},
};

/* --------------------------------
   Products
-------------------------------- */

export async function getProducts(): Promise<ProductsResponse> {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/products?populate=*`,
      {
        next: {
          revalidate: 300,
        },
      }
    );

    if (!response.ok) {
      const errorBody = await response.text();

      console.error(
        `Strapi products request failed: ${response.status} ${response.statusText}`,
        errorBody
      );

      return EMPTY_PRODUCTS_RESPONSE;
    }

    const data: ProductsResponse = await response.json();

    if (!Array.isArray(data.data)) {
      console.error(
        "Invalid Strapi products response:",
        data
      );

      return EMPTY_PRODUCTS_RESPONSE;
    }

    return data;
  } catch (error) {
    console.error(
      "Failed to fetch products:",
      error
    );

    return EMPTY_PRODUCTS_RESPONSE;
  }
}

/* --------------------------------
   Single Product
-------------------------------- */

export async function getProduct(
  slug: string
): Promise<Product | null> {
  try {
    const query = new URLSearchParams();

    query.set("filters[slug][$eq]", slug);
    query.set("populate", "*");

    const response = await fetch(
      `${STRAPI_URL}/api/products?${query.toString()}`,
      {
        next: {
          revalidate: 300,
        },
      }
    );

    if (!response.ok) {
      const errorBody = await response.text();

      console.error(
        `Strapi product request failed: ${response.status} ${response.statusText}`,
        errorBody
      );

      return null;
    }

    const data: ProductsResponse =
      await response.json();

    if (!Array.isArray(data.data)) {
      console.error(
        "Invalid Strapi single product response:",
        data
      );

      return null;
    }

    return data.data[0] ?? null;
  } catch (error) {
    console.error(
      "Failed to fetch product:",
      error
    );

    return null;
  }
}

/* --------------------------------
   Products By Category
-------------------------------- */

export async function getProductsByCategory(
  slug: string
): Promise<ProductsResponse> {
  try {
    const query = new URLSearchParams();

    query.set(
      "filters[Category][slug][$eq]",
      slug
    );

    query.set("populate", "*");

    const response = await fetch(
      `${STRAPI_URL}/api/products?${query.toString()}`,
      {
        next: {
          revalidate: 300,
        },
      }
    );

    if (!response.ok) {
      const errorBody = await response.text();

      console.error(
        `Strapi category products request failed: ${response.status} ${response.statusText}`,
        errorBody
      );

      return EMPTY_PRODUCTS_RESPONSE;
    }

    const data: ProductsResponse =
      await response.json();

    if (!Array.isArray(data.data)) {
      console.error(
        "Invalid Strapi category products response:",
        data
      );

      return EMPTY_PRODUCTS_RESPONSE;
    }

    return data;
  } catch (error) {
    console.error(
      "Failed to fetch products by category:",
      error
    );

    return EMPTY_PRODUCTS_RESPONSE;
  }
}

/* --------------------------------
   Categories
-------------------------------- */

export async function getCategories(): Promise<CategoriesResponse> {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/categories?populate=*`,
      {
        next: {
          revalidate: 300,
        },
      }
    );

    if (!response.ok) {
      const errorBody = await response.text();

      console.error(
        `Strapi categories request failed: ${response.status} ${response.statusText}`,
        errorBody
      );

      return EMPTY_CATEGORIES_RESPONSE;
    }

    const data: CategoriesResponse =
      await response.json();

    if (!Array.isArray(data.data)) {
      console.error(
        "Invalid Strapi categories response:",
        data
      );

      return EMPTY_CATEGORIES_RESPONSE;
    }

    return data;
  } catch (error) {
    console.error(
      "Failed to fetch categories:",
      error
    );

    return EMPTY_CATEGORIES_RESPONSE;
  }
}

/* --------------------------------
   Single Category
-------------------------------- */

export async function getCategory(
  slug: string
): Promise<CategoryResponse> {
  try {
    const query = new URLSearchParams();

    query.set(
      "filters[slug][$eq]",
      slug
    );

    query.set("populate", "*");

    const response = await fetch(
      `${STRAPI_URL}/api/categories?${query.toString()}`,
      {
        next: {
          revalidate: 300,
        },
      }
    );

    if (!response.ok) {
      const errorBody = await response.text();

      console.error(
        `Strapi category request failed: ${response.status} ${response.statusText}`,
        errorBody
      );

      return {
        data: null,
        meta: {},
      };
    }

    const result: CategoriesResponse =
      await response.json();

    return {
      data: result.data?.[0] ?? null,
      meta: result.meta ?? {},
    };
  } catch (error) {
    console.error(
      "Failed to fetch category:",
      error
    );

    return {
      data: null,
      meta: {},
    };
  }
}

/* --------------------------------
   About Page
-------------------------------- */

export async function getAboutPage(): Promise<AboutPageResponse> {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/about?populate=*`,
      {
        next: {
          revalidate: 300,
        },
      }
    );

    if (!response.ok) {
      const errorBody = await response.text();

      console.error(
        `Strapi about request failed: ${response.status} ${response.statusText}`,
        errorBody
      );

      return {
        data: null,
        meta: {},
      };
    }

    const data: AboutPageResponse =
      await response.json();

    if (!data.data) {
      console.error(
        "Invalid Strapi about response:",
        data
      );

      return {
        data: null,
        meta: {},
      };
    }

    return data;
  } catch (error) {
    console.error(
      "Failed to fetch about page:",
      error
    );

    return {
      data: null,
      meta: {},
    };
  }
}

/* --------------------------------
   Contact Page
-------------------------------- */

export async function getContactPage(): Promise<ContactPageResponse> {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/contact?populate=*`,
      {
        next: {
          revalidate: 300,
        },
      }
    );

    if (!response.ok) {
      const errorBody = await response.text();

      console.error(
        `Strapi contact request failed: ${response.status} ${response.statusText}`,
        errorBody
      );

      return {
        data: null,
        meta: {},
      };
    }

    const data: ContactPageResponse =
      await response.json();

    if (!data.data) {
      console.error(
        "Invalid Strapi contact response:",
        data
      );

      return {
        data: null,
        meta: {},
      };
    }

    return data;
  } catch (error) {
    console.error(
      "Failed to fetch contact page:",
      error
    );

    return {
      data: null,
      meta: {},
    };
  }
}

/* --------------------------------
   Site Settings
-------------------------------- */

export async function getSiteSettings(): Promise<SiteSettingsResponse | null> {
  try {
    const [
      mainResponse,
      footerResponse,
    ] = await Promise.all([
      fetch(
        `${STRAPI_URL}/api/site-setting?populate=*`,
        {
          next: {
            revalidate: 300,
          },
        }
      ),

      fetch(
        `${STRAPI_URL}/api/site-setting?populate[footerColumns][populate]=*`,
        {
          next: {
            revalidate: 300,
          },
        }
      ),
    ]);

    if (!mainResponse.ok) {
      const errorBody =
        await mainResponse.text();

      console.error(
        `Strapi main site settings request failed: ${mainResponse.status} ${mainResponse.statusText}`,
        errorBody
      );

      return null;
    }

    if (!footerResponse.ok) {
      const errorBody =
        await footerResponse.text();

      console.error(
        `Strapi footer request failed: ${footerResponse.status} ${footerResponse.statusText}`,
        errorBody
      );

      return null;
    }

    const mainData: SiteSettingsResponse =
      await mainResponse.json();

    const footerData: SiteSettingsResponse =
      await footerResponse.json();

    if (
      !mainData.data ||
      !footerData.data
    ) {
      return null;
    }

    return {
      ...mainData,

      data: {
        ...mainData.data,

        footerColumns:
          footerData.data.footerColumns ??
          mainData.data.footerColumns ??
          [],
      },
    };
  } catch (error) {
    console.error(
      "Failed to fetch site settings:",
      error
    );

    return null;
  }
}