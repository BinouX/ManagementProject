***************************************************************************
********************************16/05/2016*********************************
***************************************************************************

Ajout batiments - BinouX : (non fini)
	Permet l'affichage de l'interface graphiques utilisateur
	Permet de dessiner dans une div avec des couleurs differentes
	Lits des listeners comme le clic droit et le pavé numérique comme raccourci à la couleurs
( Je suis parti sur un tuto de base pour crééer une sorte de Paint, pour pouvoir le modifié ensuite 
en une carte avec des coordonnées)


***************************************************************************
********************************21/05/2016*********************************
***************************************************************************
Suppression Ajout batiments - BinouX : Inutilisatble

viewTile.js - Binoux :
	Création de la map tile format 3200*3200
	Création  des tiles de la map avec affichage grace au curseur
	Camera gerer grace au clavier et à la souris

***************************************************************************
********************************23/05/2016*********************************
***************************************************************************
viewTile.js - BinouX:
	Mise en place de l'interface avec le menu a droite
	Mise en place d'une tile en bas a gauche pour l'heure et le budget
Erreur: destroy text, affichage en chaine sur la meme zone texte


***************************************************************************
********************************26/05/2016*********************************
***************************************************************************
viewTile.js - Binoux:
	Ajout au click d'un carré blanc (taille a modifié)
	Reglage du fond de la map

***************************************************************************
********************************29/05/2016*********************************
***************************************************************************
viewTile.js - Binoux:
	Création d'un nouveau menu permettant la selection des batiments
	Création des constructeurs permettant le futur import export
	Création de contrainte sur les batiments (impossible de créer un batiments par dessus un autre)
Problème:
	Affichage du menu toujours au même endroit par rapport à la map mais les button (invisible) toujours
		au centre de l'ecran!

***************************************************************************
********************************05/06/2016*********************************
***************************************************************************
viewTile.js - Binoux:
	Ajout des données sur l'ecran de la population
	Ajout des données sur l'ecran des impots
	Ajout des données sur l'ecran du budget
	Affichage du menu
Population.js - Binoux:
	Controle de la population avec impots
Budget.js -Binoux
	Controle du budget
	

***************************************************************************
********************************09/06/2016*********************************
***************************************************************************
viewTile.js - Binoux:
	Destruction des batiments -> image detruite mais pas l'objet
			(impossible de recreer des batiments sur les batiments destruit)


***************************************************************************
********************************12/06/2016*********************************
***************************************************************************
viewTile.js - Binoux
	Destruction du batiments fonctionelle