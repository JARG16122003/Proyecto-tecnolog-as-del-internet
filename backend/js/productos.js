const admin = require("firebase-admin");
const fs = require("fs");

const serviceAccount = JSON.parse(
  fs.readFileSync("./serviceAccountKey.json", "utf8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const productos = [
  // Tortas 
  {
    nombre: "Torta Zanahoria",
    categoria: "Tortas",
    precioBase: 15000,
    porcionesOpciones: [
      {porciones: "4-5", precio: 15000},
      {porciones: "10-25", precio: 35000},
      {porciones: "25-40", precio: 60000}
    ],
    miniDescripcion: "Húmeda y especiada, con cobertura de queso.",
    descripcion: "Torta de zanahoria artesanal con glaseado de queso crema.",
    imagen: "imagenes/torta_zanahoria.jpg",
    nota: "Cobro adicional con cubierta de queso"
  },
  {
    nombre: "Torta Envinada",
    categoria: "Tortas",
    precioBase: 30000,
    porcionesOpciones: [
      {porciones: "8-10", precio: 30000},
      {porciones: "10-25", precio: 50000},
      {porciones: "25-40", precio: 90000}
    ],
    miniDescripcion: "Perfecta para celebraciones elegantes.",
    descripcion: "Torta envinada con frutas maceradas y textura húmeda.",
    imagen: "imagenes/torta_envinada.jpg"
  },
  {
    nombre: "Budín de Banana",
    categoria: "Tortas",
    precioBase: 20000,
    porcionesOpciones: [
      {porciones: "6-8", precio: 20000},
      {porciones: "10-25", precio: 40000},
      {porciones: "25-40", precio: 75000}
    ],
    miniDescripcion: "Suave, dulce y naturalmente aromático.",
    descripcion: "Budín de banana casero con textura húmeda y sabor auténtico, ideal para acompañar con café o té.",
    imagen: "imagenes/budin_banana.jpg"
  },

  // Pateles
  {
    nombre: "Pastel Red Velvet",
    categoria: "Pasteles",
    precioBase: 40000,
    porcionesOpciones: [
      {porciones: "10-15", precio: 40000},
      {porciones: "20-25", precio: 55000},
      {porciones: "30-40", precio: 75000}
    ],
    miniDescripcion: "Suave terciopelo rojo con frosting de queso crema.",
    descripcion: "Pastel red velvet con capas esponjosas y cobertura de queso crema.",
    imagen: "imagenes/pastel_redvelvet.jpg",
  },
  {
    nombre: "Pastel Limón y Amapola",
    categoria: "Pasteles",
    precioBase: 40000,
    porcionesOpciones: [
      {porciones: "10-15", precio: 40000},
      {porciones: "20-25", precio: 55000},
      {porciones: "30-40", precio: 75000}
    ],
    miniDescripcion: "Refrescante y aromático, con toque cítrico.",
    descripcion: "Pastel de limón con semillas de amapola y glaseado cítrico.",
    imagen: "imagenes/pastel_limon.jpg",
  },
  {
    nombre: "Pastel María Luisa",
    categoria: "Pasteles",
    precioBase: 40000,
    porcionesOpciones: [
      {porciones: "10-15", precio: 40000},
      {porciones: "20-25", precio: 55000},
      {porciones: "30-40", precio: 75000}
    ],
    miniDescripcion: "Clásico colombiano con arequipe y guayaba.",
    descripcion: "Pastel tradicional María Luisa con capas de bizcocho, arequipe y bocadillo de guayaba.",
    imagen: "imagenes/pastel_marialuisa.jpg",
  },
  {
    nombre: "Pastel Vainilla",
    categoria: "Pasteles",
    precioBase: 40000,
    porcionesOpciones: [
      {porciones: "10-15", precio: 40000},
      {porciones: "20-25", precio: 55000},
      {porciones: "30-40", precio: 75000}
    ],
    miniDescripcion: "Esponjoso y clásico para cualquier ocasión.",
    descripcion: "Pastel artesanal de vainilla con cobertura suave.",
    imagen: "imagenes/pastel_vainilla.jpg",
  },
  {
    nombre: "Pastel Chocolate",
    categoria: "Pasteles",
    precioBase: 40000,
    porcionesOpciones: [
      {porciones: "10-15", precio: 40000},
      {porciones: "20-25", precio: 55000},
      {porciones: "30-40", precio: 75000}
    ],
    miniDescripcion: "Rico y cremoso para amantes del chocolate.",
    descripcion: "Pastel de chocolate con ganache cremoso y capas húmedas.",
    imagen: "imagenes/pastel_chocolate.jpg",
  },

  // Cupcakes
  {
    nombre: "Cupcake Vainilla",
    categoria: "Cupcakes",
    precioBase: 3500,
    miniDescripcion: "Suave y decorado con cobertura cremosa.",
    descripcion: "Cupcake de vainilla con opciones de cobertura de chocolate o crema chantilly.",
    imagen: "imagenes/cupcake_vainilla.jpg",
    opciones: {
      masa: [
        {nombre: "Chocolate", precio: 0},
        {nombre: "Vainilla", precio: 0}
      ],
      cobertura: [
        {nombre: "Chocolate", precio: 5000},
        {nombre: "Crema Chantilly", precio: 5000}
      ],
      rellenos: [
        {nombre: "Frutos rojos", precio: 4000},
        {nombre: "Nutella", precio: 4000},
        {nombre: "Crema de Queso", precio: 4000},
        {nombre: "Arequipe", precio: 4000},
        {nombre: "Chocochips", precio: 4000}
      ]
    }
  },
  {
    nombre: "Cupcake Relleno",
    categoria: "Cupcakes",
    precioBase: 4000,
    miniDescripcion: "Con delicioso relleno a elegir.",
    descripcion: "Cupcake relleno de frutos rojos, nutella, crema de queso o arequipe.",
    imagen: "imagenes/cupcake_relleno.jpg",
    opciones: {
      masa: [
        {nombre: "Chocolate", precio: 0},
        {nombre: "Vainilla", precio: 0}
      ],
      cobertura: [
        {nombre: "Chocolate", precio: 5000},
        {nombre: "Crema Chantilly", precio: 5000}
      ],
      rellenos: [
        {nombre: "Frutos rojos", precio: 4000},
        {nombre: "Nutella", precio: 4000},
        {nombre: "Crema de Queso", precio: 4000},
        {nombre: "Arequipe", precio: 4000},
        {nombre: "Chocochips", precio: 4000}
      ]
    }
  },
  {
    nombre: "Cupcake con Cobertura Especial",
    categoria: "Cupcakes",
    precioBase: 5000,
    miniDescripcion: "Decorado con cobertura gourmet de chocolate.",
    descripcion: "Cupcake con cobertura especial de chocolate y decoración artesanal.",
    imagen: "imagenes/cupcake_cobertura.jpg",
    opciones: {
      masa: [
        {nombre: "Chocolate", precio: 0},
        {nombre: "Vainilla", precio: 0}
      ],
      cobertura: [
        {nombre: "Chocolate", precio: 5000},
        {nombre: "Crema Chantilly", precio: 5000}
      ],
      rellenos: [
        {nombre: "Frutos rojos", precio: 4000},
        {nombre: "Nutella", precio: 4000},
        {nombre: "Crema de Queso", precio: 4000},
        {nombre: "Arequipe", precio: 4000},
        {nombre: "Chocochips", precio: 4000}
      ]
    }
  },
  {
    nombre: "Muffin de Arándanos",
    categoria: "Cupcakes",
    precioBase: 4000,
    miniDescripcion: "Jugoso con frutos frescos.",
    descripcion: "Muffin casero con arándanos frescos, perfecto para el desayuno.",
    imagen: "imagenes/muffin_arandanos.jpg",
    opciones: {
      masa: [
        {nombre: "Chocolate", precio: 0},
        {nombre: "Vainilla", precio: 0}
      ],
      cobertura: [
        {nombre: "Chocolate", precio: 5000},
        {nombre: "Crema Chantilly", precio: 5000}
      ],
      rellenos: [
        {nombre: "Frutos rojos", precio: 4000},
        {nombre: "Nutella", precio: 4000},
        {nombre: "Crema de Queso", precio: 4000},
        {nombre: "Arequipe", precio: 4000},
        {nombre: "Chocochips", precio: 4000}
      ]
    }
  },
  {
    nombre: "Muffin Red Velvet",
    categoria: "Cupcakes",
    precioBase: 4500,
    miniDescripcion: "Terciopelo rojo en formato individual.",
    descripcion: "Muffin red velvet con sabor suave y textura esponjosa.",
    imagen: "imagenes/muffin_redvelvet.jpg",
    opciones: {
      masa: [
        {nombre: "Chocolate", precio: 0},
        {nombre: "Vainilla", precio: 0}
      ],
      cobertura: [
        {nombre: "Chocolate", precio: 5000},
        {nombre: "Crema Chantilly", precio: 5000}
      ],
      rellenos: [
        {nombre: "Frutos rojos", precio: 4000},
        {nombre: "Nutella", precio: 4000},
        {nombre: "Crema de Queso", precio: 4000},
        {nombre: "Arequipe", precio: 4000},
        {nombre: "Chocochips", precio: 4000}
      ]
    }
  },

  // Galletas
  {
    nombre: "Galleta Nueva York Sencilla",
    categoria: "Galletas",
    precio: 2500,
    miniDescripcion: "Crujiente y clásica estilo Nueva York.",
    descripcion: "Galleta estilo Nueva York con textura perfecta, crujiente por fuera y suave por dentro.",
    imagen: "imagenes/galleta_ny.jpg",
  },
  {
    nombre: "Galleta Chips de Chocolate",
    categoria: "Galletas",
    precio: 3500,
    miniDescripcion: "Con trozos generosos de chocolate.",
    descripcion: "Galleta artesanal con chips de chocolate de alta calidad.",
    imagen: "imagenes/galleta_chips.jpg",
  },
  {
    nombre: "Galleta Red Velvet",
    categoria: "Galletas",
    precio: 3500,
    miniDescripcion: "Suave terciopelo rojo en cada bocado.",
    descripcion: "Galleta red velvet con sabor característico y textura suave.",
    imagen: "imagenes/galleta_redvelvet.jpg",
  },
  {
    nombre: "Galleta Pistacho",
    categoria: "Galletas",
    precio: 3500,
    miniDescripcion: "Sabor único y aromático a pistacho.",
    descripcion: "Galleta gourmet de pistacho con trozos de nuez.",
    imagen: "imagenes/galleta_pistacho.jpg",
  },
  {
    nombre: "Galleta Naranja",
    categoria: "Galletas",
    precio: 3500,
    miniDescripcion: "Refrescante con toque cítrico.",
    descripcion: "Galleta de naranja con ralladura fresca y sabor vibrante.",
    imagen: "imagenes/galleta_naranja.jpg",
  },
  {
    nombre: "Galleta Vainilla Decorada",
    categoria: "Galletas",
    precio: 3500,
    miniDescripcion: "Decorada artesanalmente con glaseado.",
    descripcion: "Galleta de vainilla con decoración personalizada y glaseado royal.",
    imagen: "imagenes/galleta_vainilla_decorada.jpg",
  },
  {
    nombre: "Miss Terola",
    categoria: "Galletas",
    precio: 3500,
    miniDescripcion: "Vainilla rellena de frutos rojos.",
    descripcion: "Galleta especial de la casa rellena de mermelada de frutos rojos.",
    imagen: "imagenes/galleta_miss_terola.jpg",
  },

  //Otras recetas 
  {
    nombre: "Pastel Pequeño (4 porciones)",
    categoria: "Otras Recetas",
    precio: 15000,
    miniDescripcion: "Pastel individual ideal para compartir.",
    descripcion: "Pastel de 4 porciones en diferentes sabores disponibles.",
    imagen: "imagenes/pastel_pequeno.jpg",
  },
  {
    nombre: "Cheesecake",
    categoria: "Otras Recetas",
    precio: 4000,
    miniDescripcion: "Cremoso y suave, estilo Nueva York.",
    descripcion: "Cheesecake individual con base de galleta y textura cremosa.",
    imagen: "imagenes/cheesecake.jpg",
  },
  {
    nombre: "Galletas Oreo Recubiertas",
    categoria: "Otras Recetas",
    precio: 4500,
    miniDescripcion: "Oreo bañadas en chocolate.",
    descripcion: "Galletas Oreo completamente recubiertas en chocolate blanco, con leche o oscuro.",
    imagen: "imagenes/oreo_recubierta.jpg",
  },
  {
    nombre: "Alfajores",
    categoria: "Otras Recetas",
    precio: 3500,
    miniDescripcion: "Dulce tradicional con arequipe.",
    descripcion: "Alfajores artesanales rellenos de arequipe y cubiertos con coco.",
    imagen: "imagenes/alfajores.jpg",
  },
  {
    nombre: "Brownie",
    categoria: "Otras Recetas",
    precio: 2000,
    miniDescripcion: "Denso y chocolatoso.",
    descripcion: "Brownie húmedo con intenso sabor a chocolate, ideal para los amantes del cacao.",
    imagen: "imagenes/brownie.jpg",
  },
  {
    nombre: "Pastel Pequeño Corazón",
    categoria: "Otras Recetas",
    precio: 10000,
    miniDescripcion: "Romántico y delicado en forma de corazón.",
    descripcion: "Pastel pequeño en forma de corazón, perfecto para ocasiones especiales.",
    imagen: "imagenes/pastel_corazon.jpg",
  },
  {
    nombre: "Rollos de Canela",
    categoria: "Otras Recetas",
    precio: 5000,
    miniDescripcion: "Suaves y aromáticos con glaseado.",
    descripcion: "Rollos de canela caseros con glaseado de queso crema.",
    imagen: "imagenes/rollos_canela.jpg",
  },
  {
    nombre: "Sánduches de Pollo",
    categoria: "Otras Recetas",
    precio: 6000,
    miniDescripcion: "Frescos y nutritivos.",
    descripcion: "Sánduches de pollo con vegetales frescos y salsas caseras.",
    imagen: "imagenes/sanduches_pollo.jpg",
  },
  {
    nombre: "Pasabocas",
    categoria: "Otras Recetas",
    precio: 2500,
    miniDescripcion: "Variedad de bocaditos para eventos.",
    descripcion: "Pasabocas variados, precio desde $2.500 según el tipo.",
    imagen: "imagenes/pasabocas.jpg",
  },

  // Dulces
  {
    nombre: "Mini Muffins",
    categoria: "Dulces",
    precio: 2500,
    miniDescripcion: "Tamaño bocado para eventos.",
    descripcion: "Mini muffins en diferentes sabores, perfectos para mesas dulces.",
    imagen: "imagenes/mini_muffins.jpg",
  },
  {
    nombre: "Cheesecake Mini",
    categoria: "Dulces",
    precio: 3500,
    miniDescripcion: "Porción individual cremosa.",
    descripcion: "Mini cheesecake para eventos con diferentes sabores disponibles.",
    imagen: "imagenes/cheesecake_mini.jpg",
  },
  {
    nombre: "Mini Galletas",
    categoria: "Dulces",
    precio: 2000,
    miniDescripcion: "Galletas decoradas en tamaño pequeño.",
    descripcion: "Mini galletas decoradas ideales para brunches y celebraciones.",
    imagen: "imagenes/mini_galletas.jpg",
  },
  {
    nombre: "Mini Alfajores",
    categoria: "Dulces",
    precio: 2500,
    miniDescripcion: "Tradicionales en versión mini.",
    descripcion: "Mini alfajores rellenos de arequipe para eventos.",
    imagen: "imagenes/mini_alfajores.jpg",
  },
  {
    nombre: "Mini Brownie",
    categoria: "Dulces",
    precio: 2000,
    miniDescripcion: "Brownie en porción individual.",
    descripcion: "Mini brownies chocolatosos para mesas de dulces.",
    imagen: "imagenes/mini_brownie.jpg",
  },
  {
    nombre: "Mini Cupcakes",
    categoria: "Dulces",
    precio: 2500,
    miniDescripcion: "Cupcakes decorados en miniatura.",
    descripcion: "Mini cupcakes con cobertura, perfectos para eventos.",
    imagen: "imagenes/mini_cupcakes.jpg",
  },
  {
    nombre: "Pinchos de Fruta",
    categoria: "Dulces",
    precio: 4000,
    miniDescripcion: "Frescos y coloridos.",
    descripcion: "Pinchos con frutos rojos, durazno y limón. Precio según sabor.",
    imagen: "imagenes/pinchos_fruta.jpg",
  },

  //salado
  {
    nombre: "Mini Empanadas al Horno",
    categoria: "Salados",
    precio: 2500,
    miniDescripcion: "Crujientes y horneadas.",
    descripcion: "Mini empanadas al horno con diferentes rellenos.",
    imagen: "imagenes/mini_empanadas.jpg",
  },
  {
    nombre: "Mini Chorizo Coctelero",
    categoria: "Salados",
    precio: 1500,
    miniDescripcion: "Cocinados en Coca-Cola.",
    descripcion: "Mini chorizos cocteleros preparados en Coca-Cola.",
    imagen: "imagenes/mini_chorizo.jpg",
  },
  {
    nombre: "Bocadito Español",
    categoria: "Salados",
    precio: 3500,
    miniDescripcion: "Tostada con salami, queso y tomate cherry.",
    descripcion: "Bocadito español con combinación de salami, queso y tomate cherry fresco.",
    imagen: "imagenes/bocadito_espanol.jpg",
  },
  {
    nombre: "Mini Sánduches de Pollo",
    categoria: "Salados",
    precio: 3500,
    miniDescripcion: "Sánduches pequeños para eventos.",
    descripcion: "Mini sánduches de pollo ideales para brunches y eventos.",
    imagen: "imagenes/mini_sanduches.jpg",
  },
  {
    nombre: "Empanadas",
    categoria: "Salados",
    precio: 3500,
    miniDescripcion: "Empanadas tradicionales.",
    descripcion: "Empanadas con diferentes rellenos para eventos.",
    imagen: "imagenes/empanadas.jpg",
  },
];

async function subirProductos() {
  const batch = db.batch();

  productos.forEach((prod) => {
    const ref = db.collection("productos").doc();
    batch.set(ref, prod);
  });

  await batch.commit();
  console.log(" Todos los productos cargados correctamente en Firestore!");
}

subirProductos().catch((err) => console.error(" Error:", err));