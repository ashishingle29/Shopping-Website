import { React } from 'react';
import Header from './header/Header';
import Footer from './footer/Footer';
import  {Helmet} from "react-helmet";
import 'react-toastify/dist/ReactToastify.css';
const Layout=({children,title,description,keywords,author})=>{
    return (
        <div>
            <Helmet>
                <meta charSet='utf-8'/>
                <meta name='description' content={description}/>
                <meta name='keywords' content={keywords}/>
                <meta name='author' content={author}/>
                <title>{title}</title>
            </Helmet>
            <Header/>
            <main style={{minHeight:"80vh",height:"auto"}}>
                {children}
            </main>
            <Footer/>
        </div>
    )
}

Layout.defaultProps={
    title:"Z-Shop",
    description:"Ecommerce app developed using MERN Technologies",
    author:"ZH Rifat",
    keywords:"Ecommerce, Shopping, MERN Project, Web Development, zh_rifat, ZH Rifat, Developer"

}
export default Layout;
