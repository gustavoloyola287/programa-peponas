
import AppRoutes from "./routes/approutes.tsx";
import Navbar from "./components/NavBar.tsx";
import Footer from "./components/footer.tsx";

const App = () => {
    return (
        <div>
            <Navbar/>
            <AppRoutes/>
            <Footer/>
        </div>
    );
}
export default App; 
