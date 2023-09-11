function addData() {
    const dataInput = document.getElementById('dataInput');
    const data = dataInput.value;
    const imageInput = document.getElementById('imageInput');
    const image = imageInput.files[0];

    if (data) {
      // Retrieve existing data from localStorage
      const existingData = localStorage.getItem('dashboardData') ? JSON.parse(localStorage.getItem('dashboardData')) : [];

      // Create an object to store data and image
      const newItem = {
        data: data,
        image: image ? URL.createObjectURL(image) : null
      };

      // Add the new item
      existingData.push(newItem);

      // Store the updated data in localStorage
      localStorage.setItem('dashboardData', JSON.stringify(existingData));

      // Clear the input fields
      dataInput.value = '';
      imageInput.value = '';

      // Update the displayed data
      displayData();
    }
  }

  // Function to delete data item
  function deleteData(index) {
    const existingData = localStorage.getItem('dashboardData') ? JSON.parse(localStorage.getItem('dashboardData')) : [];

    // Remove the item at the specified index
    existingData.splice(index, 1);

    // Update the stored data in localStorage
    localStorage.setItem('dashboardData', JSON.stringify(existingData));

    // Update the displayed data
    displayData();
  }

  // Function to display stored data
  function displayData() {
    const dataList = document.getElementById('dataList');

    // Retrieve data from localStorage
    const storedData = localStorage.getItem('dashboardData');

    if (storedData) {
      const dataArr = JSON.parse(storedData);
      dataList.innerHTML = '';

      // Populate the list with stored data and images
      dataArr.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
                      <div class="image-container">
                          ${item.image ? `<img src="${item.image}" alt="Image" width="500px">` : ''}
                      </div>
                      <div>
                          ${index + 1}. ${item.data}
                      </div>
                      <span class="delete-button" onclick="deleteData(${index})">Delete</span>
                  `;

        dataList.appendChild(listItem);
      });
    }
  }

  // Function to preview image before adding
  function previewImage() {
    const imageInput = document.getElementById('imageInput');
    const imagePreview = document.getElementById('imagePreview');

    if (imageInput.files.length > 0) {
      const image = imageInput.files[0];
      const reader = new FileReader();

      reader.onload = function (e) {
        imagePreview.src = e.target.result;
      };

      reader.readAsDataURL(image);
    }
  }

  // Initial display of stored data
  displayData();