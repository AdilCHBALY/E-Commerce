"use client"

interface HeadingProps{
    title:string,
    subtitle?:string,
    center?:boolean
}


const Heading:React.FC<HeadingProps> = ({
    title,
    subtitle,
    center
}) => {
  return (
    <div className={center ? 'text-center' : 'text-start'}>
        <div className="text-3xl font-bold tracking-tight">
            {title}
        </div>
        <div className="text-sm text-muted-foreground mt-2">
            {subtitle}
        </div>
    </div>
  )
}

export default Heading