import { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_API_URL;

function getAuthHeaders() {
  const token = localStorage.getItem("token");

  if (!token) {
    return {};
  }

  return {
    Authorization: `Bearer ${token}`,
  };
}

export function useCRUD(singular, plural) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchItems() {
    try {
      setLoading(true);

      const response = await fetch(`${BASE_URL}/${plural}`);

      if (!response.ok) {
        return;
      }

      const result = await response.json();

      if (Array.isArray(result)) {
        setItems(result);
      } else {
        setItems(result.data || []);
      }
    } catch (error) {
      console.error(`Error fetching ${plural}:`, error);
    } finally {
      setLoading(false);
    }
  }

  async function create(data, isFormData = false) {
    try {
      const headers = getAuthHeaders();

      if (!isFormData) {
        headers["Content-Type"] = "application/json";
      }

      const response = await fetch(`${BASE_URL}/${singular}`, {
        method: "POST",
        headers,
        body: isFormData ? data : JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.text();

        console.error(`Error creating ${singular}:`, error);

        return {
          success: false,
          error,
        };
      }

      await fetchItems();

      return {
        success: true,
      };
    } catch (error) {
      console.error(`Error creating ${singular}:`, error);

      return {
        success: false,
        error: error.message,
      };
    }
  }

  async function update(data, isFormData = false) {
    try {
      const headers = getAuthHeaders();

      if (!isFormData) {
        headers["Content-Type"] = "application/json";
      }

      const response = await fetch(`${BASE_URL}/${singular}`, {
        method: "PUT",
        headers,
        body: isFormData ? data : JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.text();

        console.error(`Error updating ${singular}:`, error);

        return {
          success: false,
          error,
        };
      }

      await fetchItems();

      return {
        success: true,
      };
    } catch (error) {
      console.error(`Error updating ${singular}:`, error);

      return {
        success: false,
        error: error.message,
      };
    }
  }

  async function remove(id) {
    const confirmed = confirm(
      `Are you sure you want to delete this ${singular}?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/${singular}/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        const error = await response.text();

        console.error(`Error deleting ${singular}:`, error);

        return {
          success: false,
          error,
        };
      }

      await fetchItems();

      return {
        success: true,
      };
    } catch (error) {
      console.error(`Error deleting ${singular}:`, error);

      return {
        success: false,
        error: error.message,
      };
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);

  return {
    items,
    loading,
    create,
    update,
    remove,
    refresh: fetchItems,
  };
}
