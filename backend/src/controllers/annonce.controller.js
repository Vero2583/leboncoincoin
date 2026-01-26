import { createAnnonce, deleteAnnonceById, getAllAnnonces, getAnnonceById, updateAnnonceById } from "../models/annonce.model.js";
import { annonceSchema } from "../validations/annonce.validation.js";


// récuperer les annonces

export const getAnnonces = async (req, res) => {
  try {
    const annonces = await getAllAnnonces();
    res.json(annonces);
  } catch (error) {
    console.error(
      "Erreur lors de la recuperation des annonces dans model ",
      error.message,
    );
    res.status(500).json({
      message: "erreur serveur lors de la recuperation des annonces ",
    });
  }
};

// Creation d'annonces = post

export const create = async (req, res) => {
  try {
    const { title, price, city, category_id } = req.body;
    const image = req.file ? req.file.filename : null;
    const user_id = req.user.id;

    // validation

    const { error } = annonceSchema.validate({
      title,
      price,
      city,
      category_id,
    });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    await createAnnonce({ title, price, city, image, user_id, category_id });
    res.status(201).json({ message: "annonces créés avec succés" });

  } catch (error) {
    console.error(
      "Erreur lors de la creation des annonces dans model ",
      error.message,
    );
    res
      .status(500)
      .json({ message: "erreur serveur lors de la creation des annonces " });
  }
};


// recuperer une annonce by id

export const getById = async (req, res) => {
  try {
    
    const {id} = req.params;
    const annonce = await getAnnonceById(id);

    if (!annonce) {
      return res.status(404).json({ message: 'aucune annonce trouvé'})
    }

    res.json(annonce)

  } catch (error) {
    console.error(
      "Erreur lors de l'id des annonces coté model:",
      error.message,
    );
    res.status(500).json({ message: "erreur serveur lors de la creation des annonces"});
  }
}

// mettre à jour une annonce par id = put

export const updateById = async (req, res) => {
  try {

    const { id } = req.params;
    const image = req.file ? req.file.filename : undefined;

    const existingAnnonce = await getAllAnnonces(id);
    if (!existingAnnonce) {
      return res.status(404).json({ message: "Annonce non trouvé" });
   }

    // Champs updatables

   const updatedData = {
     title: req.body.title ?? existingAnnonce.title,
     price: req.body.price ?? existingAnnonce.price,
     city: req.body.city ?? existingAnnonce.city,
     category_id: req.body.category_id ?? existingAnnonce.category_id,
     image: image ?? existingAnnonce.image
    };

    
    // validation JOI

    const { error } = annonceSchema.validate(updatedData);
    if (error) {
     return res.status(400).json({ message: error.details[0].message });
    }

    await updateAnnonceById(id, updatedData);
    res.json({ message: "Annonce mise à jour", updatedData});

  } catch (error) {
    console.error("Erreur serveur lors de la mise à jour des annonces by id:", error.message);
    res.status(500).json({ message: "Erreur serveur lors de la mise à jour" });
  }
};


// suppression une annonce par son id = delete

export const deleteById = async (req, res) => {
  try {
    
    const { id } = req.params;

    const deleted = await deleteAnnonceById(id)
    if (!deleted) {
      return res.status(404).json({ message: "aucune annonce trouvé"})
    }

    res.json({ message: "annonce supprimé avec success"})

  } catch (error) {
    console.error("Erreur serveur lors de la suppression des annonces by id:", error.message);
    res.status(500).json({ message: "Erreur serveur lors de la suppression" });
  }
}

