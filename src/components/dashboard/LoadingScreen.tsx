import QuintIcon from "@/assets/quint-icons/quint-icon-red.png";

export interface LoadingScreenProps {
  title?: string;
  text?: string;
}

export const LoadingScreen = ({ title, text }: LoadingScreenProps) => {
  const defaultTitle = title || "Quint Accounting";
  const defaultText = text || "Cargando aplicación...";

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <img
          src={QuintIcon}
          style={{ width: "40px", height: "40px" }}
          alt="Quint Accounting"
          className="mx-auto mt-4"
        />
        <h1 className="mt-4 text-xl font-semibold">{defaultTitle}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{defaultText}</p>
        <div className="mt-3 animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
      </div>
    </div>
  );
};
