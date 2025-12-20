import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // 🔥 FIX: Initialize user from localStorage immediately
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    const parsedUser = savedUser ? JSON.parse(savedUser) : null;
    console.log("🔍 AuthContext initialized:", {
      hasUser: !!parsedUser,
      userId: parsedUser?.id || parsedUser?._id,
      username: parsedUser?.username
    });
    return parsedUser;
  });

  // Track if we're loading user data
  const [isLoadingUser, setIsLoadingUser] = useState(false);

  // 🔥 refreshUser - WITHOUT clearing user state
  const refreshUser = async () => {
    console.log("🔄 refreshUser called");
    
    // Get userId (could be .id or ._id depending on backend)
    const userId = user?.id || user?._id;
    
    console.log("🔍 User before refresh:", {
      userId: userId,
      username: user?.username,
      userExists: !!user,
      fullUser: user
    });

    if (!userId) {
      console.warn("⚠️ No user.id available for refresh");
      return;
    }

    setIsLoadingUser(true);
    console.log("⏳ Fetching user data from backend...");
    
    try {
      const url = `https://inspection-loop-neck-assuming.trycloudflare.com/auth/me/${userId}`;
      console.log("📡 Fetching from:", url);
      
      const res = await fetch(url);
      const data = await res.json();

      console.log("📥 Refresh response:", { 
        ok: res.ok, 
        status: res.status,
        data 
      });

      if (res.ok) {
        console.log("✅ Updating user with fresh data");
        
        // Normalize the response (backend might return _id instead of id)
        const normalizedUser = {
          id: data.id || data._id,
          username: data.username,
          ...data
        };
        
        console.log("💾 Saving normalized user:", normalizedUser);
        
        // Update user WITHOUT setting to null first
        setUser(normalizedUser);
        localStorage.setItem("user", JSON.stringify(normalizedUser));
        console.log("✅ User saved to localStorage");
      } else {
        console.error("❌ Refresh failed with response:", data);
      }
    } catch (err) {
      console.error("❌ Failed to refresh user:", err);
    } finally {
      setIsLoadingUser(false);
      console.log("🔍 User after refresh attempt:", {
        userId: user?.id || user?._id,
        username: user?.username,
        userExists: !!user
      });
    }
  };

  const login = (userData) => {
    console.log("🔐 Login called with:", userData);
    
    // Normalize user data (might have _id or id)
    const normalizedUser = {
      id: userData.id || userData._id,
      username: userData.username,
      ...userData
    };
    
    console.log("💾 Saving normalized user:", normalizedUser);
    setUser(normalizedUser);
    localStorage.setItem("user", JSON.stringify(normalizedUser));
    console.log("✅ User logged in and saved to localStorage");
  };

  const logout = () => {
    console.log("🚪 Logout called");
    setUser(null);
    localStorage.removeItem("user");
    console.log("✅ User logged out and removed from localStorage");
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, login, logout, refreshUser, isLoadingUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};