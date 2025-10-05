function recommendCoffee() {
    const coffee = document.getElementById('coffee-type').value;
    const recommendations = {
        espresso: "Try our bold dark roast espresso shot!",
        latte: "A creamy latte with a hint of vanilla is perfect for you.",
        cappuccino: "Our frothy cappuccino will lift your spirits.",
        americano: "A smooth americano, light and refreshing!",
        mocha: "Sweet chocolate mocha, a treat for your taste buds."
    };
    document.getElementById('recommendation').innerText = recommendations[coffee];
}
