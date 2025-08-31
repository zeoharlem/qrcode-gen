import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function TriggerAlertDialog({trigger, title, cancelText, children}: {
    trigger: React.ReactNode,
    title: string,
    cancelText: string,
    children?: React.ReactNode,
}) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
            <AlertDialogContent className="sm:max-w-5xl w-full h-[80vh] flex flex-col">
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                </AlertDialogHeader>
                <div className="flex-1 overflow-y-auto pr-2">
                    {children}
                </div>
                <AlertDialogFooter>
                    {/*<AlertDialogCancel>{cancelText}</AlertDialogCancel>*/}
                    <AlertDialogAction>{cancelText}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}