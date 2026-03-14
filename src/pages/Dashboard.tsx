import { useState, useRef, useEffect } from "react";
import { Settings } from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useTheme } from "@/contexts/ThemeContext";
import { useUser, type User } from "@/contexts/UserContext";

const Dashboard = () => {

  const { user, setUser } = useUser();
  const { isDark } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [bio, setBio] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // sincronizar con contexto
  useEffect(() => {
    if (!user) return;

    setNombre(user.nombre);
    setEmail(user.email);
    setTelefono(user.telefono ?? "");
    setDireccion(user.direccion ?? "");
    setBio(user.bio ?? "");
    setAvatarPreview(user.avatarUrl ?? "/default-avatar.png");

  }, [user]);

  if (!user) return <p>Cargando...</p>;

  // subir avatar
  const uploadAvatar = async (file: File) => {

    const formData = new FormData();
    formData.append("file", file);

    try {

      const res = await fetch(
        `http://localhost:8081/api/users/${user.id}/avatar`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user.token}`
          },
          body: formData
        }
      );

      if (!res.ok) throw new Error("Error subiendo avatar");

      const data = await res.json();

      const updatedUser: User = {
        ...user,
        avatarUrl: data.avatarUrl
      };

      setUser(updatedUser);

    } catch (err) {
      console.error(err);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    if (!e.target.files) return;

    const file = e.target.files[0];

    setAvatarPreview(URL.createObjectURL(file));

    uploadAvatar(file);
  };

  const handleIconClick = () => fileInputRef.current?.click();

  const handleSave = async () => {

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {

      const res = await fetch(
        `http://localhost:8081/api/users/${user.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`
          },
          body: JSON.stringify({
            nombre,
            email,
            telefono,
            direccion,
            bio
          })
        }
      );

      if (!res.ok) throw new Error("Error actualizando perfil");

      const updatedUser = await res.json();

      setUser({
        ...user,
        ...updatedUser
      });

      setSuccess("Perfil actualizado correctamente");

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`flex flex-col gap-8 w-full max-w-3xl mx-auto p-6 ${isDark ? "text-white" : "text-black"}`}>

      {/* header */}
      <div className="flex items-center gap-6 bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-md relative">

        <Avatar src={avatarPreview} size={100} className="w-24 h-24" />

        <button
          type="button"
          onClick={handleIconClick}
          className="absolute top-4 left-20 p-1 bg-gray-800 rounded-full hover:bg-gray-700"
        >
          <Settings size={20} className="text-white" />
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="ml-4">
          <h1 className="text-3xl font-bold">{nombre}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-300">{email}</p>
        </div>

      </div>

      {/* formulario */}

      <div className="flex flex-col gap-4 w-full p-6 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-md">

        <Input label="Nombre completo" value={nombre} onChange={(e) => setNombre(e.target.value)} />

        <Input label="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} type="email" />

        <Input label="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />

        <Input label="Dirección" value={direccion} onChange={(e) => setDireccion(e.target.value)} />

        <Input label="Bio" value={bio} onChange={(e) => setBio(e.target.value)} />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        {success && <p className="text-green-500 text-sm">{success}</p>}

        <Button onClick={handleSave} loading={loading} fullWidth>
          {loading ? "Guardando..." : "Guardar cambios"}
        </Button>

      </div>

    </div>
  );
};

export default Dashboard;