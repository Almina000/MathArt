function drawCircleForHashtag(rectX, rectY, rectWidth, rectHeight, colors, surfaceAreas, shapes) {
  
    let circles = []; // Array zum Speichern der gezeichneten Kreise
    let indexCount = 0;

     // Berechne die Goldener-Schnitt-Positionen
    let goldenRatio = 0.618;
    let x1 = rectX + rectWidth * goldenRatio;
    let x2 = rectX + rectWidth * (1 - goldenRatio);
    let y1 = rectY + rectHeight * goldenRatio;
    let y2 = rectY + rectHeight * (1 - goldenRatio);

    // Definiere die vier Punkte im Goldenen Schnitt
    let goldenPoints = [
        { x: x1, y: y1 },
        { x: x2, y: y1 },
        { x: x1, y: y2 },
        { x: x2, y: y2 }
    ];

    fill(255, 0, 0); // Rot
    noStroke();
    goldenPoints.forEach(point => {
      ellipse(point.x, point.y, 10, 10); // Zeichne kleine Kreise zur Markierung
    });

    // Zeichne Kreise für die 10 häufigsten Hashtags
    surfaceAreas.forEach((area, index) => {
    // Prüfen, ob das aktuelle shapes-Element "circle" ist
    if (shapes[index] === "circle") {

        if (indexCount === 0){

            let radius = sqrt(surfaceAreas[0] / PI); // Radius abhängig von Häufigkeit
            let point = goldenPoints[Math.floor(random(0, goldenPoints.length))]; // Zufälligen roten Punkt auswählen

            fill(colors[index]);
            noStroke();
            ellipse(point.x, point.y, radius * 2, radius * 2);

            // Speichere den größten Kreis, um spätere Überlappungsprüfung zu ermöglichen
            circles.push({ x: point.x, y: point.y, radius: radius });
            indexCount++;

        } else {
            let radius = sqrt(area / PI); // Radius abhängig von Häufigkeit
            let x, y;
            let validPosition = false;

            // Suche nach einer gültigen Position für den Kreis
            for (let attempt = 0; attempt < 100; attempt++) {
                x = random(rectX + radius, rectX + rectWidth - radius);
                y = random(rectY + radius, rectY + rectHeight - radius);

                // Überprüfe die Überschneidung mit bereits gezeichneten Kreisen
                let overlaps = false;
                for (let circle of circles) {
                    let d = dist(x, y, circle.x, circle.y);
                    let minDistance = radius + circle.radius * 0.67; // 67% der Summe der Radien
                    if (d < minDistance) {
                        overlaps = true;
                        break;
                    }
                }
                // Wenn keine Überschneidung gefunden wurde, position ist gültig
                if (!overlaps) {
                    validPosition = true;
                    break;
                }
            }   
            // Wenn eine gültige Position gefunden wurde, zeichne den Kreis
            if (validPosition) {
                fill(colors[index]);
                noStroke();
                ellipse(x, y, radius * 2, radius * 2);

                // Speichere die Informationen des gezeichneten Kreises
                circles.push({ x: x, y: y, radius: radius });
            }

        }       
    }
});

  
}
