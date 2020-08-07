function generateRandomValues(ent) {
	var occs = ent.getOccurrences();
	for (var i=0; i<occs.length; i+=1) {
		occs[i].getField("VALUE").setValue( Math.floor(24 * Math.random()) );
	}
}