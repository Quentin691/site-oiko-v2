export function Banner({ src, alt }: { src?: string; alt?: string }){
    return (
        <div>
            {src ? (
                <img src={src} alt={alt} className="w-full object-cover"/>
            ) : (
                <div className="w-full h-64 bg-muted"/>
            )}
        </div>
    )
}