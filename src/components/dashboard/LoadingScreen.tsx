import QuintIcon from '@/assets/quint-icons/quint-icon-red.png';

export function LoadingScreen() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center">
                <img src={QuintIcon} style={{ width: '40px', height: '40px' }} alt="Quint Accounting" className="mx-auto mt-4" />
                <h1 className="mt-4 text-xl font-semibold">Quint Accounting</h1>
                <p className="mt-2 text-sm text-muted-foreground">Cargando aplicación...</p>
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            </div>
        </div>
    );
}
