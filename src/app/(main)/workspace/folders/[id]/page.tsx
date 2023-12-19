type Props = {
    params: { id: string };
};

export default function FolderPage({ params }: Props) {
    return <p className="text-xl">{params.id}</p>;
}
