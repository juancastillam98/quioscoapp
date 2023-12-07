//interno
import Head from "next/head";
import { Inter } from 'next/font/google'
//dependencias
//import Modal from  "react-modal"
import {ToastContainer} from "react-toastify"; //dependencia para usar alertas
//componentes
import {Sidebar} from "../components/Sidebar";
import {Pasos} from "../components/Pasos";
//hooks
import QuioscoProvider from "../context/QuioscoProvider";
import "../styles/globals.css"
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] })

/*export const metadata = {
  title: 'Create Next App',
  description: 'Quiosco Cafetería',
}*/

export default function RootLayout({ children }) {

  return (
        <html>
            <QuioscoProvider>
                <body id="kioscoapp_nextjs">
                    <Head>
                        <title> Café</title>
                    </Head>
                    <div className={"md:flex"}>
                        <aside className={"md:w-4/12 xl:w-1/4 2xl:w-1/5"}>
                            <Sidebar/>
                        </aside>
                        <main className={"md:w-8/12 xl:w-3/4 2xl:w-4/5 h-screen overflow-y-scroll p-2.5"}>
                            <Pasos/>
                            {children}
                        </main>
                    </div>
                </body>
            </QuioscoProvider>

        <ToastContainer/>
        </html>

  )
}
