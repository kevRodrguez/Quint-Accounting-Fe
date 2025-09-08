
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button'
import { useNavigate } from 'react-router-dom'



//caroussel

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"



export default function home() {

    const navigate = useNavigate();
    return (
        <div style={{ backgroundColor: 'rgb(10 10 10)', padding: 0 }} className='grid grid-cols-4 gap-4'>
            <div className='col-span-4 justify-center'>
                <Badge style={{ backgroundColor: '#262626' }}>Ahora Disponible en la versión 1.1</Badge>
            </div>


            <h1 style={{ color: 'white', fontSize: 'xxx-large' }} className='font-bold col-span-4'>Build your Component Library</h1>
            <p style={{ color: 'white' }} className='col-span-2 col-start-2'>A set of beautifully-designed, accessible components and a code distribution platform. Works with your favorite frameworks. Open Source. Open Code.</p>

            <div className='col-span-2 col-start-2 grid grid-cols-4 gap-4 mt-5'>

                <Button className='col-span-4 md:col-start-2  md:col-span-1' onClick={() => navigate('/login')}>Comenzar ahora!</Button>
                <Button className='col-span-4 md:col-start-3 md:col-span-1' onClick={() => navigate('/login')}>Ver Servicios</Button>
            </div>



            <div className='col-span-4 mt-5 mr-15 ml-15'>

                <Carousel>
                    <CarouselContent>
                        <CarouselItem>

                            <img src="src\assets\jpeg.jpg" alt="" />
                        </CarouselItem>
                        <CarouselItem><img src="src\assets\jpeg (1).jpg" alt="" /></CarouselItem>
                        <CarouselItem>...</CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>

            </div>



            <div className='col-span-4 mt-5 mr-15 ml-15'>



            </div>
        </div>



    )
}
