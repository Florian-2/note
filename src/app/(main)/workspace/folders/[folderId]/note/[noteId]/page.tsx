type Props = {
    params: { noteId: string };
};

export default function NotePage({ params }: Props) {
    return <p>{params.noteId}</p>;
}
