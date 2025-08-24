import supabase from './app/auth/supabase';

export const API_BASE_URL = "http://172.16.146.120:3000";
export const AuthProvider = async() => {
    const { data: { session } } = await supabase.auth.getSession()
    const uuid = session?.user.id
    let user_id = await Get_user_id(String(uuid))
    return user_id
}

async function Get_user_id(uuid: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/getUser_id`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uuid : uuid
        }),
      });

      const data = await response.json();
      return data
    
    } catch (error) {
      console.error("에러 발생:", error);
    }
  }