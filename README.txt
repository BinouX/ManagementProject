***************************************************************************
********************************16/05/2016*********************************
***************************************************************************

Ajout batiments - BinouX : (non fini)
	Permet l'affichage de l'interface graphiques utilisateur
	Permet de dessiner dans une div avec des couleurs differentes
	Lits des listeners comme le clic droit et le pav� num�rique comme raccourci � la couleurs
( Je suis parti sur un tuto de base pour cr��er une sorte de Paint, pour pouvoir le modifi� ensuite 
en une carte avec des coordonn�es)


***************************************************************************
********************************21/05/2016*********************************
***************************************************************************
Suppression Ajout batiments - BinouX : Inutilisatble

viewTile.js - Binoux :
	Cr�ation de la map tile format 3200*3200
	Cr�ation  des tiles de la map avec affichage grace au curseur
	Camera gerer grace au clavier et � la souris

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
	Ajout au click d'un carr� blanc (taille a modifi�)
	Reglage du fond de la map

***************************************************************************
********************************29/05/2016*********************************
***************************************************************************
viewTile.js - Binoux:
	Cr�ation d'un nouveau menu permettant la selection des batiments
	Cr�ation des constructeurs permettant le futur import export
	Cr�ation de contrainte sur les batiments (impossible de cr�er un batiments par dessus un autre)
Probl�me:
	Affichage du menu toujours au m�me endroit par rapport � la map mais les button (invisible) toujours
		au centre de l'ecran!

***************************************************************************
********************************05/06/2016*********************************
***************************************************************************
viewTile.js - Binoux:
	Ajout des donn�es sur l'ecran de la population
	Ajout des donn�es sur l'ecran des impots
	Ajout des donn�es sur l'ecran du budget
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
viewTile.js - Binoux:
	Destruction du batiments fonctionelle

***************************************************************************
********************************14/06/2016*********************************
***************************************************************************
pathFindRoad.js - Binoux:
	Ajout de l'algorithme pour afficher la bonne image
		(Verifier les images � cot� des images ins�r�)
