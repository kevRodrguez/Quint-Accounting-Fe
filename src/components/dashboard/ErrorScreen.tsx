import QuintIcon from "@/assets/quint-icons/quint-icon-red.png";

export interface ErrorScreenProps {
  title?: string;
  error?: string;
}

export const ErrorScreen = ({ title, error }: ErrorScreenProps) => {
  const defaultTitle = title || "Quint Accounting";
  const defaultError = error || "Ha ocurrido un error.";

  return (
    <div className="min-h-screen flex justify-center bg-background">
      <div className="text-center">
        <img
          src={QuintIcon}
          style={{ width: "40px", height: "40px" }}
          alt="Quint Accounting"
          className="mx-auto mt-4"
        />
        <h1 className="mt-4 text-xl font-semibold">{defaultTitle}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{defaultError}</p>
      </div>
    </div>
  );
};
