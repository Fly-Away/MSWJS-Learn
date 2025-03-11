import { computed, ref } from 'vue'

export function useFetch() {
  const data = ref();

  const fetchRequest = async (url: string, options: FetchOptions = {isAuth: false}) => {
    if (!url) {
      console.error("URL is missing.");
      return;
    }

    const headers = new Headers(options.headers || {});

    // Tambahkan Authorization header jika `skipAuth` tidak aktif
    if (options.isAuth) {
      const token = 'dummy token';

      headers.set('Authorization', `Bearer ${token}`);
    }

    // Gabungkan headers dan opsi lainnya
    const finalOptions: RequestInit = {
      ...options,
      headers,
    };

    try {
      const response = await fetch(url, finalOptions);

      data.value = await response.json();
    } catch (error) {
      console.error('Error in fetchRequest:', error);
      throw error; // Teruskan error ke komponen pemanggil
    }

  }

  return {
    data,
    fetchRequest
  }
}

interface FetchOptions extends RequestInit {
  isAuth?: boolean; // Tambahan opsi untuk melewati Authorization
}
